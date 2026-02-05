import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/db";

const INTERCOM_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;
const INTERCOM_API_URL = "https://api.intercom.io";
const INTERCOM_VERSION = "2.14"; // mesma versão do token no Intercom

// Tag que será aplicada aos leads do workshop
const WORKSHOP_TAG = "workshop-agente-ia-fev26";

interface SubscribeBody {
  name: string;
  email: string;
  phone: string;
}

// Formata telefone para padrão E.164 (Intercom exige)
function formatPhone(phone: string): string | null {
  if (!phone) return null;
  
  // Remove tudo que não é número
  const digits = phone.replace(/\D/g, "");
  
  // Se não tem dígitos suficientes, ignora
  if (digits.length < 10) return null;
  
  // Se já começa com 55 e tem 12-13 dígitos, assume que já está formatado
  if (digits.startsWith("55") && digits.length >= 12) {
    return "+" + digits;
  }
  
  // Se tem 10-11 dígitos, assume Brasil e adiciona +55
  if (digits.length >= 10 && digits.length <= 11) {
    return "+55" + digits;
  }
  
  // Para outros casos, tenta adicionar + no início
  return "+" + digits;
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeBody = await request.json();
    const { name, email, phone } = body;

    // Validação básica
    if (!email || !name) {
      return NextResponse.json(
        { error: "Nome e e-mail são obrigatórios" },
        { status: 400 }
      );
    }

    if (!INTERCOM_TOKEN) {
      console.error("INTERCOM_ACCESS_TOKEN não configurado");
      // Em produção, você pode querer falhar silenciosamente e ainda redirecionar
      return NextResponse.json(
        { success: true, warning: "Integração Intercom não configurada" },
        { status: 200 }
      );
    }

    // Formatar telefone
    const formattedPhone = formatPhone(phone);

    // 1. Criar ou atualizar contato no Intercom
    const contactPayload: Record<string, string> = {
      role: "lead",
      email: email,
      name: name,
    };
    
    // Só adiciona telefone se estiver formatado corretamente
    if (formattedPhone) {
      contactPayload.phone = formattedPhone;
    }

    const contactResponse = await fetch(`${INTERCOM_API_URL}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${INTERCOM_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Intercom-Version": INTERCOM_VERSION,
      },
      body: JSON.stringify(contactPayload),
    });

    if (!contactResponse.ok) {
      const errorBody = await contactResponse.text();
      console.error("[Intercom] Falha ao criar contato. Status:", contactResponse.status, "Resposta:", errorBody);
      
      // Se o contato já existe, tenta buscar e atualizar
      if (contactResponse.status === 409) {
        // Buscar contato existente por email
        const searchResponse = await fetch(
          `${INTERCOM_API_URL}/contacts/search`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${INTERCOM_TOKEN}`,
              "Content-Type": "application/json",
              Accept: "application/json",
              "Intercom-Version": INTERCOM_VERSION,
            },
            body: JSON.stringify({
              query: {
                field: "email",
                operator: "=",
                value: email,
              },
            }),
          }
        );

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          if (searchData.data && searchData.data.length > 0) {
            const existingContact = searchData.data[0];
            
            // Atualizar contato existente
            const updateData: Record<string, string> = { name: name };
            if (formattedPhone) {
              updateData.phone = formattedPhone;
            }
            
            await fetch(`${INTERCOM_API_URL}/contacts/${existingContact.id}`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${INTERCOM_TOKEN}`,
                "Content-Type": "application/json",
                Accept: "application/json",
                "Intercom-Version": INTERCOM_VERSION,
              },
              body: JSON.stringify(updateData),
            });

            // Aplicar tag ao contato existente
            await applyTagToContact(existingContact.id);

            await insertLead({ name, email, phone: formattedPhone ?? null });
            return NextResponse.json({
              success: true,
              message: "Contato atualizado com sucesso",
              contactId: existingContact.id,
            });
          }
        }
      }

      // Se não conseguiu criar nem atualizar, salva no Neon mesmo assim e retorna sucesso
      await insertLead({ name, email, phone: formattedPhone ?? null });
      return NextResponse.json({
        success: true,
        warning: "Erro ao sincronizar com Intercom, mas inscrição registrada",
      });
    }

    const contactData = await contactResponse.json();
    const contactId = contactData.id;

    // 2. Aplicar tag ao contato
    await applyTagToContact(contactId);

    await insertLead({ name, email, phone: formattedPhone ?? null });
    return NextResponse.json({
      success: true,
      message: "Inscrição realizada com sucesso",
      contactId: contactId,
    });
  } catch (error) {
    console.error("Erro na API de inscrição:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

async function applyTagToContact(contactId: string) {
  try {
    // Primeiro, buscar ou criar a tag
    const tagsResponse = await fetch(`${INTERCOM_API_URL}/tags`, {
      headers: {
        Authorization: `Bearer ${INTERCOM_TOKEN}`,
        Accept: "application/json",
        "Intercom-Version": INTERCOM_VERSION,
      },
    });

    let tagId: string | null = null;

    if (tagsResponse.ok) {
      const tagsData = await tagsResponse.json();
      const existingTag = tagsData.data?.find(
        (tag: { name: string; id: string }) => tag.name === WORKSHOP_TAG
      );
      if (existingTag) {
        tagId = existingTag.id;
      }
    }

    // Se a tag não existe, criar
    if (!tagId) {
      const createTagResponse = await fetch(`${INTERCOM_API_URL}/tags`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${INTERCOM_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Intercom-Version": INTERCOM_VERSION,
        },
        body: JSON.stringify({
          name: WORKSHOP_TAG,
        }),
      });

      if (createTagResponse.ok) {
        const newTag = await createTagResponse.json();
        tagId = newTag.id;
      }
    }

    // Aplicar tag ao contato
    if (tagId) {
      const tagAttachRes = await fetch(`${INTERCOM_API_URL}/contacts/${contactId}/tags`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${INTERCOM_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Intercom-Version": INTERCOM_VERSION,
        },
        body: JSON.stringify({
          id: tagId,
        }),
      });
      if (!tagAttachRes.ok) {
        const tagErr = await tagAttachRes.text();
        console.error("[Intercom] Falha ao aplicar tag ao contato. Status:", tagAttachRes.status, "Resposta:", tagErr);
      }
    } else {
      console.warn("[Intercom] Tag não encontrada/criada, contato ficará sem a tag", WORKSHOP_TAG);
    }
  } catch (error) {
    console.error("[Intercom] Erro ao aplicar tag:", error);
    // Não lança erro para não bloquear o fluxo principal
  }
}

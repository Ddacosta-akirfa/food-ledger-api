import nodemailer from "nodemailer";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!),
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });
  }

  emailHtml = (userName: string, activationLink: string) => `
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <title>Active sua conta FoodLedger</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 30px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
              <td style="background:#0f172a; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:20px;">
                  Active sua conta FoodLedger
                </h1>
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:30px; color:#111827;">
                <p>Olá <strong>${userName}</strong>,</p>
                <p>Obrigado por se cadastrar no FoodLedger!</p>
                <p>Para activar sua conta e começar a usar nossos serviços, por favor clique no botão abaixo:</p>

                <p style="text-align:center; margin: 30px 0;">
                  <a href="${activationLink}" 
                     style="
                       background-color:#0f172a; 
                       color:#ffffff; 
                       padding:12px 24px; 
                       border-radius:6px; 
                       text-decoration:none; 
                       font-weight:bold;
                       display:inline-block;
                     ">
                    Activar Conta
                  </a>
                </p>

                <p>Ou copie e cole o link abaixo no seu navegador:</p>
                <p style="word-break: break-all; font-size:12px; color:#6b7280;">
                  ${activationLink}
                </p>

                <p>Se você não se cadastrou, ignore este email.</p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
                <p style="margin:0;">
                  Esta mensagem foi enviada automaticamente. Por favor, não responda.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  async sendMail(options: {
    from: string;
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
  }): Promise<void> {
    const mailOptions = {
      ...options,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    };

    await this.transporter.sendMail(mailOptions);
  }
}

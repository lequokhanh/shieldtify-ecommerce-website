using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
namespace shieldtify.common;
public class EmailService
{
    private readonly SmtpClient _smtpClient;

    public EmailService()
    {
        _smtpClient = new SmtpClient("smtp.gmail.com", 587)
        {
            UseDefaultCredentials = false,
            EnableSsl = true,
            Credentials = new NetworkCredential("lequockhanhkt03@gmail.com", "betr jivy wcan ixks")
        };
    }

    public async Task SendMailForCreatePassword(string recipient, string token)
    {
        try
        {
            var message = new MailMessage("your_email@gmail.com", recipient)
            {
                Subject = "Shieldtify - Create Password",
                Body = $@"You are receiving this because you (or someone else) have requested the reset of the password for your account.
Please click on the following link, or paste this into your browser to complete the localhost:3000/{token}
If you did not request this, please ignore this email and your password will remain unchanged."
            };
            await _smtpClient.SendMailAsync(message);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
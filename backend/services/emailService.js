const nodemailer = require('nodemailer');

// Create transporter with Gmail configuration using App Password
let transporter;
let emailEnabled = false;

try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS  // This should be an App Password, not regular password
    }
  });
  
  // Test the transporter by verifying credentials
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Email service configuration error:', error.message);
      console.log('⚠️  Email notifications will be logged instead of sent');
    } else {
      console.log('✅ Email service is ready to send notifications');
      emailEnabled = true;
    }
  });
} catch (error) {
  console.log('❌ Failed to initialize email transporter:', error.message);
  console.log('⚠️  Email notifications will be logged instead of sent');
  
  // Mock transporter for testing when actual email fails
  transporter = {
    sendMail: async (mailOptions) => {
      console.log('=== MOCK EMAIL LOG ===');
      console.log('TO:', mailOptions.to);
      console.log('SUBJECT:', mailOptions.subject);
      console.log('HTML CONTENT:', mailOptions.html.substring(0, 200) + '...');
      console.log('=========================');
      console.log('EMAIL WOULD HAVE BEEN SENT (logged in console)');
      return { messageId: 'mock-' + Date.now(), accepted: [mailOptions.to] };
    },
    verify: (callback) => callback(null, true)
  };
}

const sendEmailReminder = async (to, taskTitle, dueDate) => {
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@taskmanager.com',
      to,
      subject: 'Task Reminder - Due Soon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0;">🔔 Task Reminder</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Your task is due soon!</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057; margin: 0 0 10px 0;">📝 Task: ${taskTitle}</h3>
              <p style="color: #6c757d; margin: 5px 0;">
                <strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <p style="color: #495057; font-size: 16px; line-height: 1.6;">
              This is a friendly reminder that your task is due soon. Please make sure to complete it on time.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6c757d; font-size: 14px;">
                You can manage your tasks by logging into your dashboard.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
            <p>This is an automated reminder from your Task Management System</p>
          </div>
        </div>
      `
    });
    
    if (emailEnabled) {
      console.log(`✅ Email reminder sent successfully to ${to} for task: ${taskTitle}`);
    } else {
      console.log(`📝 Email reminder logged for ${to} for task: ${taskTitle} (not sent due to configuration)`);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error sending email reminder:', error.message);
    console.log('⚠️  Continuing with internal notifications only');
    // Don't throw error to allow the app to continue functioning
    return null;
  }
};

module.exports = { sendEmailReminder };
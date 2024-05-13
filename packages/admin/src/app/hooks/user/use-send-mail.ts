import React from "react";
import * as Api from "src/api";
import * as Contexts from "src/app/contexts";

export const sendMail = () => {
  const user = React.useContext(Contexts.UserContext);
  const send = (subject: string, htmlContent: string) => {
    Api.Server.Request("sendMailNotification", {
      email: user?.email,
      subject,
      htmlContent,
    });
  };
  return { send };
};

// Already used template
/* <div style="width:100%;height:auto;background-color:lightgrey;padding:2em;">
  <table cellspacing="0" border="0" align="center" style="width:100%;">
   <tbody style="background-color:#15113d;">
      <tr>
        <td style="padding: 33.0px 0;" valign="middle" align="center">
          <a href="https://www.tycoonfin.com" target="_blank">
           <img style="border:1px;" src="https://www.tycoonfin.com/images/logo.png" alt="Tycoon finance logo" />
          </a>
        </td>
      </tr>
      <tr>
       <td>
        <div style="padding:0px 30px;">
         <table style="width:100%;" cellspacing="0" cellpadding="0" border="0">
             <tbody>
              <tr>
               <td style="font-weight:bold;color:#fff">Verify your Email</td>
              </tr>
             </tbody>
         </table>
         <hr/>
         <table style="width:100%;" cellspacing="1" cellpadding="5" border="0">
            <tbody>
             <tr>
              <td style="color:#fff">Hello Developer,</td>
             </tr>
             <tr>
              <td style="color:#fff">Please click on the below link to veirfy your E-Mail address</td>
             </tr>
             <tr>
              <td><a style="color:brown;" target="_blank" href="https://www.tycoonfin.com/web/account/login?token=">https://www.tycoonfin.com</a></td>
             </tr>
            </tbody>
         </table>
         <table style="width:100%;padding-top:30px;padding-bottom:10px;" cellspacing="0" cellpadding="5" border="0">
          <tbody>
           <tr>
            <td style="color:#fff">Tycoon Team</td>
           </tr>
           <tr>
            <td style="color:#fff">Automated message. Please do not reply.</td>
           </tr>
          </tbody>
         </table>
        </div>
       </td>
      </tr>
   </tbody>
  </table>
</div> */

// Privacy Policy + Terms & Conditions content, taken from https://arkade.in/privacy-policy/
//
// Two values on the source page are unfilled placeholders ("[Date]" and the contact e-mail,
// which the live site hides behind Cloudflare). They are handled here instead of being
// published as "[Date]" on the page:
//   effectiveDate  -> when set (e.g. "1 November 2026") the "effective from" sentence is shown,
//                     otherwise that sentence is left out.
//   contactEmail   -> when set, rendered as a mailto link; otherwise the page points visitors
//                     to the enquiry form on the home page.
export const legalMeta = {
  effectiveDate: "",
  contactEmail: "",
};

// Block types: { p, label? } paragraph (optional bold lead-in) · { ul } bullet list.
// "{site}" is replaced with the current host name at render time.
export const privacyPolicy = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  eyebrow: "Legal",
  intro: [
    "This Privacy Policy sets out how “Arkade Developers Limited” (“Arkade Developers”) uses and protects any information that you provide when you use this website.",
    "Arkade Developers is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement. Arkade Developers may update this policy from time to time by updating this page. You should check this page periodically to ensure that you are happy with any changes.",
  ],
  parts: [
    {
      id: "privacy",
      title: "Privacy",
      sections: [
        {
          id: "what-we-collect",
          title: "What We Collect",
          blocks: [
            { p: "We may collect the following information:" },
            {
              ul: [
                "Name and job title",
                "Contact information, including email address and phone number",
                "Demographic information such as postal code, preferences, and interests",
                "Other information relevant to customer surveys and/or offers",
              ],
            },
          ],
        },
        {
          id: "what-we-do",
          title: "What We Do with the Information We Gather",
          blocks: [
            { p: "We require this information to understand your needs and provide you with a better service, particularly for the following reasons:" },
            {
              ul: [
                "Internal record keeping",
                "Improvement of our products and services",
                "Periodic promotional emails about new projects, special offers, or other information we think may interest you, using the email address you provided",
                "Market research purposes, where we may contact you by email, phone, or mail",
                "Customizing the website according to your interests",
              ],
            },
          ],
        },
        {
          id: "security",
          title: "Security",
          blocks: [
            { p: "We are committed to ensuring that your information is secure. To prevent unauthorized access or disclosure, we have implemented suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online." },
          ],
        },
        {
          id: "cookies",
          title: "How We Use Cookies",
          blocks: [
            { p: "A cookie is a small file that asks permission to be placed on your computer’s hard drive. Once you agree, the file is added, and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to tailor their operations to your needs, likes, and dislikes by gathering and remembering information about your preferences." },
            { p: "We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website to tailor it to customer needs. We only use this information for statistical analysis purposes, and then the data is removed from the system. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. This may prevent you from taking full advantage of the website." },
          ],
        },
        {
          id: "other-websites",
          title: "Links to Other Websites",
          blocks: [
            { p: "Our website may contain links to other websites of interest. However, once you use these links to leave our site, you should note that we do not have any control over those external websites. Therefore, we cannot be responsible for the protection and privacy of any information you provide while visiting such sites, and such sites are not governed by this privacy statement. You should exercise caution and review the privacy policy applicable to the website in question." },
          ],
        },
        {
          id: "controlling-information",
          title: "Controlling Your Personal Information",
          blocks: [
            { p: "You may choose to restrict the collection or use of your personal information in the following ways:" },
            {
              ul: [
                "Whenever you are asked to fill in a form on the website, look for the box to indicate that you do not want the information to be used for direct marketing purposes.",
                "If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us.",
              ],
            },
            { p: "We will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law. We may use your personal information to send you promotional information about third parties that we think you may find interesting if you indicate that you wish for this to happen." },
          ],
        },
      ],
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      sections: [
        {
          id: "terms-of-use",
          title: "Terms of Use",
          blocks: [
            { p: "To avail of the services offered at {site}, you must agree to the following terms and conditions:" },
            { p: "Please read the terms and conditions carefully. By using any current or future services offered by Arkade Developers, you agree to abide by these terms and conditions as well as any additional guidelines and conditions applicable to such services or businesses." },
          ],
        },
        {
          id: "electronic-communication",
          title: "Electronic Communication",
          blocks: [
            { p: "When you visit our website or voluntarily send emails to us, you are communicating with us electronically. We will keep a record of this information so that we can respond to you periodically. By submitting your personal information and contact details, you consent to receive communication from us through Email, SMS, Call, WhatsApp, or any other communication medium, even if your number is on a Do Not Disturb (DND) registry. You agree that all agreements, notices, disclosures, and other communications provided to you electronically satisfy any legal requirement that such communication be in writing." },
          ],
        },
        {
          id: "license",
          title: "License and Website Access",
          blocks: [
            { label: "General:", p: "Arkade Developers grants you a limited license to access and make personal use of this website, provided that you do not download (other than page caching) or modify any portion of it without express written consent." },
            { label: "No license for commercial sale:", p: "This license does not permit resale, commercial use, collection and use of product listings, descriptions, pricing, copying of account information for another merchant’s benefit, or the use of data mining or similar data gathering tools." },
            { label: "No reproduction:", p: "This website or any portion of it may not be reproduced, duplicated, copied, sold, or exploited for any commercial purpose without express written consent." },
            { label: "No framing:", p: "You may not frame or use framing techniques to enclose any trademark, logo, or proprietary information without express written consent." },
            { label: "Metatags:", p: "You may not use any metatags or hidden text utilizing Arkade Developers’ name or trademarks without express written consent. Unauthorized use terminates the permission or license granted." },
          ],
        },
        {
          id: "intellectual-property",
          title: "Intellectual Property Rights",
          blocks: [
            { label: "Copyright Protection:", p: "All content on this site, including text, graphics, logos, button icons, audio clips, digital downloads, data compilations, and software, is the property of Arkade Developers and protected by Indian copyright laws. The compilation of all content on this site is the exclusive property of Arkade Developers and protected under applicable copyright laws." },
            { label: "Trademarks:", p: "All Arkade Developers graphics, logos, page headers, button icons, scripts, and service names are trademarks or trade dress of Arkade Developers. These trademarks and trade dress may not be used in connection with any product or service that is not affiliated with Arkade Developers." },
          ],
        },
        {
          id: "disclaimer",
          title: "Disclaimer of Warranties and Limitation of Liability",
          blocks: [
            { p: "This site is provided by Arkade Developers on an “as is” and “as available” basis. Arkade Developers makes no representations or warranties of any kind, express or implied, as to the operation of this site or the information, content, materials, or products included on this site. Your use of this site is at your sole risk. To the full extent permissible by applicable law, Arkade Developers disclaims all warranties, including but not limited to implied warranties of merchantability and fitness for a particular purpose. Arkade Developers does not warrant that the site, its servers, or email sent from Arkade Developers are free of viruses or other harmful components. Arkade Developers will not be liable for any damages of any kind arising from the use of this site, including but not limited to direct, indirect, incidental, punitive, and consequential damages." },
          ],
        },
      ],
    },
  ],
};

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";
import Footer2 from "../components/Footer2";
import Container from "../screens/Container";
import { Helmet } from "react-helmet";
function PrivacyPolicy() {
  const listStyle = {
    listStyleType: "disc", // Use 'disc' for bullets
    marginLeft: "20px", // Adjust the left margin as needed
  };
  const data = [
    {
      category: "Identifiers",
      examples:
        "First and last name; email address; phone number; home address; social security number, driver’s license, passport, or other government issued identity document; password and account credentials; Employer Identification Number (or comparable number issued by a government); and other contact and personal identification information",
    },
    {
      category:
        "Personal information categories listed in the California Civ Code § 1798.80(e)",
      examples:
        "First and last name; phone number; home address; signature; social security number, driver’s license, passport, or other government issued identity document; payment card information; bank account information",
    },
    {
      category: "Internet or other electronic activity information",
      examples:
        "Cookie identifiers; pixel tags; embedded scripts; tags; IP address, device identifier, device type, operating system and Internet browser type, screen resolution, operating system name and version, device manufacturer and model, language, plug- ins, add-ons, and the language version of the Websites and Apps you are visiting; geolocation data, browsing history, time spent on the Platform, pages visited, links clicked, language preferences, patterns of use, and the pages that led or referred you to our Platform including individual Websites and Apps",
    },
    {
      category:
        "Characteristics of protected classifications under California or federal law",
      examples:
        "Date of birth; demographic information (e.g., nationality, gender)",
    },
    {
      category: "Commercial information",
      examples:
        "Payment histories; account balances and activity; products and services that you have purchased, obtained, or considered; utility bills; profit and loss statements; income statements; credit score and other credit report information; information about transactions you make on the Services; and/or other purchasing or consumer histories, tendencies, and preferences",
    },
    {
      category: "Geolocation data",
      examples:
        "Global Positioning System (“GPS”) data based on your IP address",
    },
    {
      category: "Audio, electronic, or visual information",
      examples:
        "Photographs; recordings of calls to or from our customer service centers",
    },
    {
      category: "Professional or employment-related information",
      examples: "Professional or employment-related information",
    },
    {
      category: "Inferences about you",
      examples:
        "Inferences based on information about an individual to create a profile about a consumer reflecting the individual’s preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes",
    },
    // Add more data as needed
  ];
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Capital Velocity</title>
        <meta
          name="description"
          content="Review the Capital Velocity Privacy Policy to learn how we collect, use, and safeguard your personal data, including information under CCPA and CPRA."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/privacy-policy"
        />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "url": "https://www.capitalvelocity.com/privacy-policy",
      "description": "Detailed Privacy Policy for Capital Velocity outlining data collection, usage, and user rights under CCPA, CPRA, and other applicable laws.",
      "publisher": {
        "@type": "Organization",
        "name": "Capital Velocity",
        "url": "https://www.capitalvelocity.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.capitalvelocity.com/assets/cvlogo-BWrm997-.png"
        }
      }
    }
    `}
        </script>
      </Helmet>

      <div style={{ backgroundColor: "#c0dced", marginBototm: 20 }}>
        <Container>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h3" color="black">
              Privacy Policy
            </Typography>
            <Typography variant="body1" color="black">
              This Privacy Policy shall be effective as of March 1, 2025.
              <br></br> <br></br>
              This website is owned and operated by Capital Velocity, Inc.
              (“Capital Velocity”). We at Capital Velocity respect and protect
              the privacy of visitors to our websites, and the privacy of our
              customers. We respect and value the privacy of our clients and
              have developed this Privacy Policy to demonstrate our commitment
              to protecting your privacy. Except where otherwise noted, this
              Privacy Policy applies to and describes our information handling
              practices when you access our services, which include our content
              located on this website, or any other websites, pages, features,
              or content we own or operate (collectively, the “Site(s)”) or
              third-party applications relying on API, and related services
              (referred to collectively hereinafter as “Services”). <br></br>
              <br></br>These Sites are general audience websites and we do not
              knowingly collect personal, or other, information from children
              under the age of 18. If you are under the age of 18, please do not
              use our site. If we suspect that information provided to us is, in
              fact, personal information of an individual younger than 18 years
              of age, such information will be deleted, aggregated, or
              anonymized as soon as possible. Please notify us if you know of
              any individuals under the age of 18 using our services so we can
              take action to prevent access to our services.<br></br>
              <br></br> Capital Velocity is a small business marketplace to
              assist small businesses in accessing and managing capital. Our
              Privacy Policy applies to everyone who utilizes our Sites.
              <br></br>
              <br></br> We encourage you to review Capital Velocity’s Terms of
              Use. Where we require your consent to process your personal
              information, we will ask for your consent to the collection, use,
              and disclosure of your personal information as described further
              below. We may provide additional “just-in-time” disclosures or
              information about the data processing practices of specific
              Services. These notices may supplement or clarify our privacy
              practices or may provide you with additional choices about how we
              process your data.<br></br>
              <br></br>
              <strong> 1. Types of Information that is collected</strong>
              <br></br>
              <br></br>We collect several types of information about you and
              your business when you access our Sites.<br></br>
              <br></br> Our Sites collects information that identifies, relates
              to, describes, references, is reasonably capable of being
              associated with, or could reasonably be linked, directly or
              indirectly, with a particular consumer, household, or
              device(“Personal Information”). Personal information does not
              include:
              <br></br>
              <br></br>
              <ul>
                <li>
                  <strong>•</strong>Publicly available information from
                  government records.
                </li>
                <li>
                  <strong>•</strong>Deidentified or aggregated consumer
                  information.
                </li>
              </ul>
              <br></br>
              <br></br>
              To establish an account and access our Services, we’ll ask you to
              provide us with some important information about you. This
              information is either required by law (e.g. to verify your
              identity), necessary to provide the requested services (e.g. you
              will need to provide three (3) months of bank statements), or is
              relevant for certain specified purposes, described in greater
              detail below. As we add new features and Services, you may be
              asked to provide additional information.<br></br>
              <br></br>Please note that we may not be able to serve you at all,
              or our Services may be degraded if you choose not to share certain
              information with us.<br></br>
              <br></br>1.1 Information we collect directly from you:
              <br></br>
              <br></br>We collect information directly from you about you
              <br></br>
              <br></br>
              <ul>
                <li>
                  <strong>•Personal Identification Information:</strong>Full
                  name, date of birth, demographic information (e.g.
                  nationality, gender) signature, utility bills, photographs,
                  phone number, home address, IP Address, social security
                  number, and/or email.
                </li>
                <li>
                  <strong>•Formal Identification Information:</strong>Government
                  issued identity document such as Passport, Driver’s License,
                  National Identity Card, State ID Card, Tax ID number, passport
                  number, driver’s license details, national identity card
                  details, visa information, and/or any other information deemed
                  necessary to comply with our legal obligations under
                  financial, consumer protection, and commercial lending laws.
                </li>
                <li>
                  <strong>•Institutional Information: </strong>Employer
                  Identification number (or comparable number issued by a
                  government), proof of legal formation (e.g. Articles of
                  Incorporation), personal identification information for all
                  material beneficial owners.
                </li>
                <li>
                  <strong>•Financial Information </strong>Bank account
                  information, Tax return information, Federal and State Tax ID,
                  Profit and Loss Statements, Income statements, Credit Score,
                  Business Invoices, and Wire Instructions.
                </li>
                <li>
                  <strong>•Transaction Information: </strong>Information about
                  the transactions you make on our Services, such as the name of
                  the recipient, your name, the amount, and/or timestamp.
                </li>
                <li>
                  <strong>•Employment Information </strong>Office location, job
                  title, and/or description of role.
                </li>
                <li>
                  <strong>•Correspondence</strong>Survey responses, information
                  provided to our support team or user research team.
                </li>
                <li>
                  <strong>•Business Information</strong>Type of business, list
                  of officers, members, or managers of the business, articles of
                  incorporation, certificates of good standing, and ownership
                  structure.
                </li>
              </ul>
              <br></br>
              <br></br>The documents and information collected are securely
              stored and safeguarded. To fulfill our service obligations to you,
              you provide your permission to share any and all information
              provided to or obtained by Capital Velocity on your behalf with
              lenders, with other businesses who may need this information to
              fulfill its services to Capital Velocity, for Capital Velocity’s
              business purposes, or to fulfill regulatory or other legal
              requirements. Under no circumstances will we disclose, transmit,
              or share in any way, these documents without your permission,
              unless being disclosed pursuant to legal and regulatory
              requirements which prohibit this notification.<br></br>
              <br></br>1.2 Information we collect from you automatically
              <br></br>
              <br></br>
              We collect information about your computer’s interactions with our
              Sites for a variety of purposes. We receive and store certain
              types of information automatically, such as whenever you interact
              with the Sites or use the Services. This information helps us
              address customer support issues, improve the performance of our
              Sites and applications, provide you with a streamlined and
              personalized experience, and protect your account from fraud by
              detecting unauthorized access. Information collected automatically
              includes:
              <br></br>
              <br></br>
              <ul>
                <li>
                  <strong>•Online Identifiers:</strong>Geo location/tracking
                  details, browser fingerprint, operating system, browser name
                  and version, and/or device IP addresses.
                </li>
                <li>
                  <strong>•Usage Data:</strong> Authentication data, security
                  questions, click-stream data, public social networking posts,
                  and other data collected via cookies and similar technologies.
                </li>
                <li>
                  <strong>•Institutional Information: </strong>Employer
                  Identification number (or comparable number issued by a
                  government), proof of legal formation (e.g. Articles of
                  Incorporation), personal identification information for all
                  material beneficial owners.
                </li>
              </ul>
              <br></br>
              For example, we may automatically receive and record the following
              information on our server logs:
              <br></br>
              <ul style={listStyle}>
                <li>How you came to and use the Services;</li>
                <li>Device type and unique device identification numbers;</li>
                <li>
                  Device event information (such as crashes, system activity and
                  hardware settings, browser type, browser language, the date
                  and time of your request and referral URL);
                </li>
                <li>
                  How your device interacts with our Sites and Services,
                  including pages accessed and links clicked;
                </li>
                <li>Geographic location;</li>
                <li>
                  Other technical data collected through cookies, pixel tags,
                  and other similar technologies that uniquely identify your
                  browser.
                </li>
              </ul>
              <br></br>
              We may also use identifiers to recognize you when you access our
              Sites via an external link, such as a link appearing on a
              third-party site.
              <br></br>
              <br></br>
              1.3 Information collected from third parties
              <br></br>
              <br></br>
              We may obtain the following types of information about you from
              third party sources.
              <br></br>
              <br></br>
              From time to time, we may obtain information about you from third
              party sources as required or permitted by applicable law. These
              sources may include:
              <br></br>
              <br></br>
              <ul style={listStyle}>
                <li>
                  Public Databases & ID Verification Partners: We obtain
                  information about you from public databases and ID
                  verification partners for purposes of verifying your identity
                  in accordance with applicable law.
                </li>
                <li>
                  Credit Bureaus: With your consent, we obtain information from
                  credit bureaus, including your credit report. We will not
                  disclose your credit report without your explicit permission.
                  We obtain your credit information to better provide services
                  to you, to match you with appropriate lenders, to ensure your
                  identity, and to avoid fraud.
                </li>
                <li>
                  Financial Institution: With your consent, we obtain
                  information directly from your financial institution,
                  including copies of your account statements. We obtain this
                  information to assist in providing Services to you, including
                  the underwriting process.
                </li>
                <li>
                  Joint Marketing Partners & Resellers: For example, unless
                  prohibited by applicable law, joint marketing partners or
                  resellers may share information about you with us so that we
                  can better understand which of our Services may be of interest
                  to you.
                </li>
                <li>
                  Advertising Networks & Analytics Providers: We work with these
                  providers to provide us with de-identified information about
                  how you found our Sites and how you interact with the Sites
                  and Services. This information may be collected prior to
                  account creation.
                </li>
                <li>
                  Third Party Service Providers: Capital Velocity customers who
                  use certain of our products are subject to third-party privacy
                  policies.
                </li>
              </ul>
              <br></br>
              <br></br>
              1.4 Data Anonymization and Data Aggregation
              <br></br>
              <br></br>
              We may use data we have anonymized and aggregated for any business
              purpose.
              <br></br>
              <br></br>
              Anonymization is a data processing technique that removes or
              modifies personal information so that it cannot be associated with
              a specific individual. Except for this section, none of the other
              provisions of this Privacy Policy applies to anonymized or
              aggregated customer data (i.e. information about our customers
              that we combine together so that it no longer identifies or
              references an individual customer).
              <br></br>
              <br></br>
              Capital Velocity may use anonymized or aggregate customer data for
              any business purpose, including to better understand customer
              needs and behaviors, improve our products and services, conduct
              business intelligence and marketing, and detect security threats.
              We may perform our own analytics on anonymized data or enable
              analytics provided by third parties.
              <br></br>
              <br></br>
              Types of data we may anonymize include, transaction data,
              click-stream data, performance metrics, and fraud indicators.
              Moreover, should you request that your information be deleted in
              accordance with the policies set forth more fully below, your
              information will be anonymized or aggregated, which complies with
              applicable law regarding deletion of personal information.
              <br></br>
              <br></br>
              <strong>2. How information is collected</strong>
              <br></br>
              <br></br>
              We obtain information about you during the application process,
              and also through your interactions with our Sites.
              <br></br>
              <br></br>
              Where we require your consent to process your personal
              information, we will ask for your consent to the collection, use,
              and disclosure of your personal information as described further
              below. We may provide additional “just-in-time” disclosures or
              information about the data processing practices of specific
              Services. These notices may supplement or clarify our privacy
              practices or may provide you with additional choices about how we
              process your data, If you do not agree with or you are not
              comfortable with any aspect of this Privacy Policy, you should
              immediately discontinue access or use of our Services
              <br></br>
              <br></br>
              We obtain the categories of personal information listed below from
              the following sources:
              <br></br>
              <br></br>
              <ul style={listStyle}>
                <li>
                  Directly from you: For example, from forms you complete or by
                  using our Products and Services.
                </li>
                <li>
                  Indirectly from you: For example, from observing your actions
                  on our Sites.
                </li>
                <li>
                  Third Parties: For example, from third-party services which
                  you connect to as part of using our Services.
                </li>
              </ul>
              <br></br>
              <br></br>
              During the Application Process: To process your initial
              application for funding, we may require your name, address, phone
              number, email address and other personal information. We may also
              require the name of your business, its address, its federal and
              state tax ID, the type of business, business location, average
              monthly sales, state of incorporation, name of Landlord. Such
              information is used primarily to process your order or as
              otherwise described herein. This is information you provide to us
              through our Sites.
              <br></br>
              <br></br>
              Emails and telephone calls: We require an email address from you
              when you register for our services. We use your email for both
              transactional (e.g., application status, application updates,
              application confirmation, etc.) and promotional (e.g.,
              newsletters, new product offerings, event notifications, special
              third-party offers) purposes. E-mail messages we send you may
              contain code that enables our database to track your usage of the
              e-mails, including whether the email was opened and what links (if
              any) were clicked. If you would rather not receive promotional
              emails from us, please see the section below labeled
              “Choice/Opt-Out”. We reserve the right to send you certain
              communications relating to the Capital Velocity services, such as
              service announcements and administrative messages, without
              offering you the opportunity to opt out of receiving them. We may
              also contact you by telephone or text message (including to any
              wireless number you may provide to us) solely in connection with
              Capital Velocity’s services. If you would rather not receive
              telephone calls or text messages from us, you may change or delete
              your number from your account preferences page(s), or ask to be
              removed from our contact list if you receive a call or text
              message from us. We fully comply with the requirements of the U.S.
              CAN-SPAM Act, the Telephone Sales Rule, and the Telephone Consumer
              Protection Act (TCPA).
              <br></br>
              <br></br>
              Log files: Any time you visit any of our Sites, our servers
              automatically gather information from your browser (such as your
              IP addresses, browser type, Internet service provider (ISP),
              referring/exit pages, platform type, date/time stamp, and number
              of clicks) to analyze trends, administer the site, prevent fraud,
              track visitor movement in the aggregate, and gather broad
              demographic information. For example, we may log your IP address
              for system administration purposes. IP addresses are logged to
              track a user’s session. This gives us an idea of which parts of
              our site users are visiting. We do not share the log files
              externally.
              <br></br>
              <br></br>
              Cookies: We use “cookies” to keep track of some types of
              information while you are visiting our Sites or using our
              services. Cookies are very small files placed on your computer,
              and they allow us to count the number of visitors to our Sites and
              distinguish repeat visitors from new visitors. They also allow us
              to save user preferences and track user trends. We rely on cookies
              for the proper operation of our Sites; therefore if your browser
              is set to reject all cookies, the Sites will not function
              properly. Users who refuse cookies assume all responsibility for
              any resulting loss of functionality. We do not link the cookies to
              any personally identifiable information.
              <br></br>
              <br></br>
              Web Beacons: ”Web beacons” (also known as “clear gifs” and “pixel
              tags”) are small transparent graphic images that are often used in
              conjunction with cookies in order to further personalize our Sites
              for our users and to collect a limited set of information about
              our visitors. We may also use web beacons in email communications
              in order to understand the behavior of our customers. We do not
              link the web beacons to any personally identifiable information.
              <br></br>
              <br></br>
              Other sources and third parties: We may obtain information about
              you from third parties. We combine this third-party data with
              information we already have about you to create tailored
              advertising and other relevant product recommendations. If you
              provide information about others, or if others give us your
              information, we will only use that information for the specific
              reason for which it was provided to us.Any information obtained
              from a third-party will be used to assist matching your business
              with various lenders.
              <br></br>
              <br></br>
              The sites contain links to other websites that are maintained by
              third parties. These third parties are solely responsible for
              their own websites and we encourage you to reach out to such third
              parties for copies of and information regarding their security
              practices. We do not control, and are not responsible for, the
              privacy and security practices of these third parties.
              <br></br>
              <br></br>
              <strong>3. How your information is used</strong>
              We use your information for a variety of reasons, all of which
              support Capital Velocity’s Sites and Services.
              <br></br>
              <br></br>
              Provide Capital Velocity services: We process your personal
              information to provide the Services to you. For example, when you
              wish to seek business financing from one of our financing
              partners, we require certain information such as your
              identification, contact information, and income information. We
              cannot provide you with Services without such information.
              <br></br>
              <br></br>
              To provide Service communications: We send administrative or
              account-related information to you to keep you updated about our
              Services, inform you of relevant security issues or updates, or
              provide other transaction-related information. Without such
              communications, you may not be aware of important developments
              relating to your account that may affect how you can use our
              Services. You may not opt-out of receiving critical service
              communications, such as emails or mobile notifications sent for
              legal or security purposes;
              <br></br>
              <br></br>
              To provide Customer service: We process your personal information
              when you contact us to resolve any questions, disputes, collect
              fees, or to troubleshoot problems. Without processing your
              personal information for such purposes, we cannot respond to your
              requests and ensure your uninterrupted use of the Services;
              <br></br>
              <br></br>
              For research and development purposes: We process your personal
              information to better understand the way you use and interact with
              Capital Velocity’s Services. In addition, we use such information
              to customize, measure, and improve Capital Velocity’s Services and
              the content and layout of our applications, and to develop new
              services. Without such processing, we cannot ensure your continued
              enjoyment of our Services;
              <br></br>
              <br></br>
              To enhance your experience: We process your personal information
              to provide a personalized experience, and implement the
              preferences you request. For example, you may choose to provide us
              with access to certain personal information stored by third
              parties. Without such processing, we may not be able to ensure
              your continued enjoyment of part or all of our Services;
              <br></br>
              <br></br>
              To facilitate corporate acquisitions, mergers, or transactions: We
              may process any information regarding your account and use of our
              Services as is necessary in the context of corporate acquisitions,
              mergers, or other corporate transactions. You have the option of
              closing your account if you do not wish to have your personal
              information processed for such purposes.
              <br></br>
              <br></br>
              To maintain legal and regulatory compliance: Most of our core
              Services are subject to laws and regulations requiring us to
              collect, use, and store your personal information in certain ways.
              For example, Capital Velocity must identify and verify customers
              using our Services in order to comply with commercial lending laws
              across jurisdictions.
              <br></br>
              <br></br>
              To enforce our terms in our user agreement and other agreements:
              Capital Velocity handles sensitive information, such as your
              identification and financial data, so it is very important for us
              and our customers that we actively monitor, investigate, prevent,
              and mitigate any potentially prohibited or illegal activities,
              enforce our agreements with third parties, and/or prevent and
              detect violations of our posted user agreement or agreements for
              other Services;
              <br></br>
              <br></br>
              To detect and prevent fraud: We process your personal information
              in order to help detect, prevent, and mitigate fraud and abuse of
              our services and to protect you against account compromise or
              information loss;
              <br></br>
              <br></br>
              To ensure Quality control: We process your personal information
              for quality control and staff training to make sure we continue to
              provide you with accurate information. If we do not process
              personal information for quality control purposes, you may
              experience issues on the Services;
              <br></br>
              <br></br>
              To ensure network and information security: We process your
              personal information in order to enhance security, monitor and
              verify identity or service access, combat spam or other malware or
              security risks and to comply with applicable security laws and
              regulations. The threat landscape on the internet is constantly
              evolving, which makes it more important than ever that we have
              accurate and up-to-date information about your use of our
              Services. Without processing your personal information, we may not
              be able to ensure the security of our Services;
              <br></br>
              <br></br>
              We may disclose your personal information as required by law, to
              provide the Services, and for legitimate business purposes.
              <br></br>
              <br></br>
              We may share your personal information by disclosing it to a third
              party for a business purpose. We only make these business purpose
              disclosures under written contracts that describe the purposes,
              require the recipient to keep the personal information
              confidential, and prohibit using the disclosed information for any
              purpose except performing the contract.
              <br></br>
              <br></br>
              <em>1. Disclosure By Law:</em>
              <br></br>
              <br></br>
              You acknowledge and agree that we may disclose information you
              provide if required to do so by law, at the request of a third
              party, or if we, in our sole discretion, believe that disclosure
              is reasonable to (1) comply with the law, requests or orders from
              law enforcement, or any legal process (whether or not such
              disclosure is required by applicable law) and (2) protect or
              defend Capital Velocity ́s, or a third party ́s, rights or property.
              <br></br>
              <br></br>
              <em>2. Lenders and/or brokers.</em>
              <br></br>
              <br></br>
              By signing up for our services or submitting a request for a
              business loan product or service as offered on the sites, you
              signify your agreement to proceed and that you are consenting,
              acknowledging and agreeing to the disclosure of your information
              with lenders and/or brokers within our network. We will not
              perform a credit check without your authorization. Please be aware
              that the lenders, brokers, and/or other service providers with
              whom you are matched and with whom your information is shared may
              retain your information, even if you do not enter into an
              agreement for their products or services. Please contact each such
              party directly regarding their privacy and information policies.
              Also, if you enter into an agreement with a lender, broker, or
              other service provider through the Capital Velocity service and
              make changes to the information you have provided to us, we may
              share the updated information with such lenders, brokers, and/or
              service providers.
              <br></br>
              <br></br>
              <em>3. Disclosure to Trusted Third Parties By Us:</em>
              <br></br>
              <br></br>
              Upon completing a profile on the site, and filling out the
              entirety of the application, we will share your information with
              third party service providers with whom you are matched. A list of
              those partners can be found on our partners page. By accepting the
              Terms of Use, you agree to receive various marketing materials
              from our trusted third parties, including potential lenders and
              service providers. We are not responsible for the material of the
              third parties or their actions. Your information may also be
              shared with third-party contractors that provide services to
              Capital Velocity and are bound by this privacy policy. Your
              information will be treated as private and confidential by such
              third parties and not used for any other purpose than you
              authorize. In addition, from time to time, we may share personal
              information (such as e-mail or mailing address) about our user
              base with carefully selected third parties, so they can offer
              goods and services that we believe may be of interest to our
              users. If you do not wish to receive offers from our trusted
              partners, you can change your email preferences at any time by
              following the steps outlined in the “Choice/Opt-Out” section
              below.
              <br></br>
              <br></br>
              <em>4. Service Providers</em>
              <br></br>
              <br></br>
              With service providers under contract who help with parts of our
              business operations. Our contracts require these service providers
              to only use your information in connection with the services they
              perform for us, and prohibit them from selling your information to
              anyone else. Examples of the types of service providers we may
              share personal information with (other than those mentioned above)
              include:
              <br></br>
              <br></br>
              <ul style={listStyle}>
                <li>Network infrastructure</li>
                <li>Cloud storage</li>
                <li>Payment processing</li>
                <li>Transaction monitoring</li>
                <li>Security</li>
                <li>Document repository services</li>
                <li>Customer support</li>
                <li>Internet (e.g. ISPs)</li>
                <li>Data analytics</li>
                <li>Information Technology</li>
                <li>Marketing</li>
              </ul>
              <br></br>
              <br></br>
              <em>5. Other Companies</em>
              <br></br>
              <br></br>
              With companies or other entities that we plan to merge with or be
              acquired by. You will receive prior notice of any change in
              applicable policies.
              <br></br>
              <br></br>
              <em>6. Third party advertising platforms and providers</em>
              <br></br>
              <br></br>
              We may share certain personal information with, or make certain
              personal information available to, third party advertising
              platforms and providers, such as Usage Data and Online
              Identifiers, when you visit certain of our Sites or certain
              portions of our Sites.
              <br></br>
              <br></br>
              <em>7. Professionals</em>
              <br></br>
              <br></br>
              With our professional advisors who provide banking, legal,
              compliance, insurance, accounting, or other consulting services in
              order to complete third party financial, technical, compliance and
              legal audits of our operations or otherwise comply with our legal
              obligations.
              <br></br>
              <br></br>
              <em>8. Miscellaneous</em>
              <br></br>
              <br></br>
              We may disclose your personal information for any purpose with
              which you consent.
              <br></br>
              <br></br>
              <strong>
                5. Updating, accessing, retaining, and deleting your information
              </strong>
              <br></br>
              <br></br>
              You may choose to update, access, or delete your data; however, we
              may be legally required to retain your information to comply with
              the law.
              <br></br>
              <br></br>
              You may update or access your contact information at any time by
              logging into your account and making any change or update. Any
              changes made will be updated immediately.
              <br></br>
              <br></br>
              If you want to stop using your account you may deactivate it. When
              you deactivate an account, your information will not be sent to
              any further lenders, brokers, or other third parties, but the
              information will not be deleted. By deactivating your account you
              will have the ability to restore the account in its entirety.
              <br></br>
              <br></br>
              You may delete your account from Capital Velocity in certain
              circumstances upon submitting a request to Capital Velocity to
              delete your account. In certain circumstances, Capital Velocity is
              legally required to continue to maintain the information in your
              account. In these circumstances, Capital Velocity will place your
              account into a deactivated status, will opt you out of all
              communications, and will disable your access to the account.
              <br></br>
              <br></br>
              In the event that Capital Velocity is able to comply with your
              request to delete your account, data you provide to Capital
              Velocity will be retained by Capital Velocity in a commercially
              reasonable manner and to comply with relevant lending laws. Once
              your account is deleted, Capital Velocity will not share your
              information, and will only use your data for internal research and
              Capital Velocity marketing. Data that is retained by Capital
              Velocity will be retained for a commercially reasonable period of
              time as determined by Capital Velocity in conformance with
              applicable law.
              <br></br>
              <br></br>
              We store your personal information securely throughout the life of
              your Capital Velocity Account. We will only retain your personal
              information for as long as necessary to fulfill the purposes for
              which we collected it, including for the purposes of satisfying
              any legal, accounting, or reporting obligations or to resolve
              disputes. While retention requirements vary by jurisdiction,
              information about our typical retention periods for different
              aspects of your personal information are described below.
              <br></br>
              <br></br>
              <ol>
                <li>
                  Personal information collected to comply with our legal
                  obligations under financial, consumer protection, and
                  commercial credit laws may be retained after account closure
                  for as long as required under such laws.
                </li>
                <li>
                  Contact Information such as your name, email address, and
                  telephone number for marketing purposes is retained on an
                  ongoing basis until you unsubscribe. Thereafter, we will add
                  your details to our suppression list to ensure we do not
                  inadvertently market to you.
                </li>
                <li>
                  Content that you post on our such as support desk comments,
                  photographs, videos, blog posts, and other content may be kept
                  after you close your account for audit and crime prevention
                  purposes (e.g. to prevent a known fraudulent actor from
                  opening a new account).
                </li>
                <li>
                  Recording of our telephone calls with you may be kept for a
                  period of up to six years.
                </li>
              </ol>
              <br></br>
              <br></br>
              Information collected via technical means such as cookies, web
              page counters and other analytics tools is kept for a period of up
              to one year from expiry of the cookie.
              <br></br>
              <br></br>
              <strong>
                Opting out of receiving electronic communications from us.
              </strong>{" "}
              If you no longer wish to receive promotional email communications
              from us, please follow the instructions provided in Section 7
              below.
              <br></br>
              <br></br>
              <strong>Your California privacy rights.</strong>In addition to the
              above, if you are a California resident, please review our
              California Privacy Notice to learn more about the personal
              information we collect, use and disclose, as well as your privacy
              rights related to your personal information under the California
              Consumer Privacy Act (CCPA) and its amendment, the California
              Privacy Rights Act (CPRA), as well as other state laws.
              <br></br>
              <br></br>
              <strong>6. Security</strong>
              <br></br>
              <br></br>
              We have taken steps to protect your information in a commercially
              reasonable manner.
              <br></br>
              <br></br>
              We have extensive security measures in place to protect the loss,
              misuse and alteration of the information stored in our database.
              These measures include the use of industry standard encryption
              methods and administrative access to site data, as well as other
              proprietary security measures which are applied to all
              repositories and transfers of user information. We will exercise
              reasonable care in providing secure transmission of information
              between your computer and our servers, but given that no
              information transmitted over the Internet can be guaranteed 100%
              secure, we cannot ensure or warrant the security of any
              information transmitted to us over the Internet and hence accept
              no liability for any unintentional disclosure. For further
              information, please see our Terms of Use.
              <br></br>
              <br></br>
              In the event there is a data breach at Capital Velocity, Capital
              Velocity will notify you as soon as reasonably practicable. We
              will notify you that a breach occurred, and any additional
              information needed to fulfill our obligation with breach
              notification laws and regulations.
              <br></br>
              <br></br>
              Do not share your account login and/or password with any other
              individual. Your account login and/or password is sensitive and
              your sharing of your account information may lead to additional
              exposure to your account.
              <br></br>
              <br></br>
              <strong>7. Choice / Opt out of Marketing</strong>
              <br></br>
              <br></br>
              You may choose to discontinue your use of our services.
              <br></br>
              <br></br>
              You may choose to stop receiving our newsletter or marketing
              emails by following the unsubscribe instruction included in these
              emails or you can contact us at info@capitalvelocity.com. You can
              choose not to provide us with certain information, but this will
              likely result in the inability to use certain features of the site
              and to obtain the services and products you are seeking. As a
              general matter, do not post personal information on public forums.
              You are solely responsible for the posting of any personal
              information on public forums.
              <br></br>
              <br></br>
              If, after signing up for our services, you decide you no longer
              wish to receive our services or future contact from lenders,
              brokers, or other third parties to which your information has been
              referred, you may cancel your account as discussed herein. Upon
              canceling your account, your information will no longer be sent to
              lenders, brokers, or other third parties. This does not guarantee
              that these lenders, brokers, or other third parties will cease
              contacting you or using your information. Please be sure to reach
              out to all lenders, brokers, and/or other third parties to ensure
              they cease contacting you.
              <br></br>
              <br></br>
              Certain federal and state regulations require that we maintain a
              record of your information for certain periods of time. Due to
              these regulations, we may be unable to completely delete your
              information from our database until the time requirements of these
              regulations have expired.
              <br></br>
              <br></br>
              <strong>8. California Privacy Notice</strong>
              <br></br>
              <br></br>
              In addition to the rights provided for above, the information
              contained in this section applies solely to those individuals who
              reside in the State of California. We adopt this notice to comply
              with the California Consumer Privacy Act of 2018 and California
              Privacy Rights Act of 2020 (together, the “CCPA”) and any terms
              defined in the CCPA have the same meaning when used in this
              Policy.
              <br></br>
              <br></br>
              Effective January 1, 2020, pursuant to the California Consumer
              Privacy Act of 2018 (“CCPA”), California residents have certain
              rights in relation to their personal information, subject to
              limited exceptions. Any terms defined in the CCPA have the same
              meaning when used in this California Privacy Notice.
              <br></br>
              <br></br>
              <strong>8.1 Personal information we collect</strong>
              <br></br>
              <br></br>
              Capital Velocity may collect, or has collected, the following
              categories of personal information from California residents
              within the last twelve (12) months:
              <br></br>
              <br></br>
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="Simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>CATEGORY</TableCell>
                    <TableCell>EXAMPLES</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.examples}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body1" color="black">
              <br></br>
              <br></br>
              Please note that because of the overlapping nature of certain of
              the categories of personal information identified above, which are
              required by state law, some of the personal information we collect
              may be reasonably classified under multiple categories.
              <br></br>
              <br></br>
              <strong>Sensitive personal information. </strong>
              Certain of the personal information that we collect, as described
              above, may constitute “sensitive personal information” under
              California law, including:
              <br></br>
              <br></br>
              <ul style={listStyle}>
                {" "}
                {/* Add a class name for styling */}
                <li>
                  Social security, driver’s license, state identification card,
                  and/or passport number
                </li>
                <li>
                  Account log-in combined with any required security or access
                  codes, passwords, or other credentials allowing access to an
                  account
                </li>
                <li>Precise geolocation</li>
                <li>Racial and/or ethnic origin</li>
                <li>
                  Personal information concerning sex life or sexual orientation
                </li>
              </ul>
              <br></br>
              <br></br>
              The specific types of personal information we collect are further
              detailed in Section 1 of this Privacy Policy. Personal information
              does not include information excluded from the CCPA’s scope.
              <br></br>
              <br></br>
              Capital Velocity will not retain any information we collect form
              you for longer than is reasonably necessary for the disclosed
              purpose of using such information. Our determination of precise
              retention periods will be based on (i) the length of time we have
              an ongoing relationship with you; (ii) whether there is a legal
              obligation to which we are subject; and (iii) whether retention is
              advisable in light of our legal position (such as in regard to
              applicable statutes of limitations, litigation or regulatory
              investigations).
              <br></br>
              <br></br>
              <strong>8.2 Uses of personal information</strong>
              <br></br>
              <br></br>
              Capital Velocity may collect, use, or disclose personal
              information about California residents for purposes listed in
              Section 3 of this Privacy Policy.
              <br></br>
              <br></br>
              The sensitive personal information that we collect as described in
              Section 10.1 above may be used for any of these purposes.
              <br></br>
              <br></br>
              <strong>8.3 Sources of personal information</strong>
              <br></br>
              <br></br>
              <strong>8.4 Disclosure of personal information</strong>
              <br></br>
              <br></br>
              We may disclose your personal information to the categories of
              service providers and third parties identified in Section 4 of
              this Privacy Policy, and in ways that are described in that
              section.
              <br></br>
              <br></br>
              This includes disclosure of your personal information to service
              providers for a business purpose. When we disclose personal
              information for a business purpose, we enter a contract that
              describes the purpose and requires the recipient to both keep that
              personal information confidential and not to use it for any
              purpose except performing the contract. In the preceding twelve
              (12) months, we have disclosed each categories of personal
              information listed in Section 8(a), including the listed sensitive
              personal information, for a business purpose.
              <br></br>
              <br></br>
              <strong>8.5 Your California privacy rights</strong>
              <br></br>
              <br></br>
              The CCPA provides California residents with specific privacy
              rights regarding their personal information. This section
              describes your CCPA rights and explains how to exercise those
              rights.
              <br></br>
              <br></br>
              If you are a California resident, you have the right to make the
              following requests under applicable California law in relation to
              your personal information, subject to certain exceptions:
              <br></br>
              <br></br>
              <ul style={listStyle}>
                <li>
                  Right to Know. You have the right to, up to twice in a
                  12-month period, request what personal information we collect,
                  use, disclose, and/or sell, and to whom, as applicable. You
                  may request either a report disclosing the general categories
                  of the personal information we collect, or a report disclosing
                  the specific pieces of personal information we collect.
                </li>
                <li>
                  Right to Delete. You have the right to request, under certain
                  circumstances, the deletion of your personal information that
                  we collect.
                </li>
                <li>
                  Right to Opt-Out of Sale or Sharing. You have the right to
                  opt-out of the “sale”/“sharing” of your personal information,
                  as those terms are defined under California law.
                </li>
                <li>
                  Right to Limit Use and Disclosure. You have the right to limit
                  the use or disclosure of your sensitive personal information
                  to only the uses necessary for us to provide our products and
                  services to you, or for certain other authorized purposes. We
                  will not use or disclose your sensitive personal information
                  after you have exercised your right unless you subsequently
                  provide consent for the use of your sensitive personal
                  information for additional purposes.
                </li>
                <li>
                  Right to Correct. You have the right to request the correction
                  of your inaccurate personal information.
                </li>
                <li>
                  Right to Non-Discrimination. You have the right not to receive
                  discriminatory treatment for the exercise of the privacy
                  rights described above.
                </li>
              </ul>
              <br></br>
              <br></br>
              <strong>How to submit a request.</strong>
              <br></br>
              <br></br>
              You can exercise your rights by contacting us at
              info@capitalvelocity.com so that we may consider your request.
              <br></br>
              <br></br>
              Any request you submit to us is subject to an identification and
              residency verification process as permitted by the CCPA. We will
              not fulfill your request unless you have provided sufficient
              information that enables us to reasonably verify that you are the
              consumer about whom we collected the personal information on. In
              order to verify you, you must provide us with first name, last
              name, and email address.
              <br></br>
              <br></br>
              <strong>Requests by authorized agents.</strong> If you are a
              California resident, you may designate an authorized agent to make
              a request to access or a request to delete on your behalf. We will
              respond to your authorized agent’s request if they submit proof
              that they are authorized to be able to act on your behalf, or
              submit evidence you have provided them with power of attorney
              pursuant to California Probate Code section 4000 to 4465. We may
              deny requests from authorized agents who do not submit proof that
              they have been authorized by you to act on their behalf, or are
              unable to verify their identity
              <br></br>
              <br></br>
              <strong>Household data.</strong>
              We currently do not collect household data. If we receive a
              request submitted by all members of a household, we will
              individually respond to each request. We will not be able to
              comply with any request by a member of a household under the age
              of 18, as we do not collect personal information from any person
              under the age of 18.
              <br></br>
              <br></br>
              <strong>Responses.</strong>
              We will respond to your request within forty-five (45) days after
              receipt of a Verifiable Consumer Request for a period covering
              twelve (12) months and for no more than twice in a twelve-month
              period. Capital Velocity reserves the right to extend the response
              time by an additional forty-five (45) days when reasonably
              necessary and provided consumer notification of the extension is
              made within the first forty-five (45) days.
              <br></br>
              <br></br>
              These rights are subject to various exclusions and exceptions
              under California law and other applicable laws. In addition, if we
              are unable to verify your identity to a degree of certainty as
              required by the CCPA through any reasonable method, we will state
              that we are unable to verify in a written response to you along
              with a reason as to why there is no reasonable method by which we
              can verify your identity.
              <br></br>
              <br></br>
              <strong>Direct marketing by third parties.</strong>
              Capital Velocity does not disclose personal information to third
              parties for their own direct marketing purposes. However,
              California residents additionally have the right to request
              information regarding such practices under California’s “Shine the
              Light” law. If you are a California resident and would like to
              inquire further, please email info@capitalvelocity.com
              <br></br>
              <br></br>
              We will continue to update our business practices as direct
              regulatory guidance becomes available.
              <br></br>
              <br></br>
              <strong>9. Special Notice to Vermont Residents</strong>
              <br></br>
              <br></br>
              Vermont residents have access to additional limits on the sharing
              of their personal information subject to certain exceptions.
              <br></br>
              <br></br>
              Vermont law places additional limits on sharing information about
              Vermont residents so long as they remain residents of Vermont. In
              accordance with Vermont law, we will not share information we
              collect about Vermont residents to companies outside of Capital
              Velocity except: (1) As permitted by law; (2) To companies that
              perform marketing or other services on our behalf; (3) Name,
              contact and transaction and experience information to other
              financial institutions with which we have joint marketing
              agreements; or (4) With the authorization or consent of the
              Vermont resident. We also will not share non-transactional
              information about Vermont residents received from others within
              the Capital Velocity family of companies except with the
              authorization or consent of the Vermont resident.
              <br></br>
              <br></br>
              <strong>10. Notification of Privacy Policy Changes</strong>
              <br></br>
              <br></br>
              We reserve the right to update this Privacy Policy and will notify
              you if we do so; however, we encourage you to regularly review
              this policy for the latest information.
              <br></br>
              <br></br>
              We may update this privacy policy to reflect changes to our
              information practices. If we make any material changes we will
              notify you by email (sent to the email address specified in your
              account) or by means of a notice on this Site. We encourage you to
              periodically review this page for the latest information on our
              privacy policy. When we make changes to this Privacy Policy we
              will revise the revision date at the top of the Privacy Policy.
              <br></br>
              <br></br>
              <strong>11. Contact Information</strong>
              <br></br>
              <br></br>
              If you have any questions about this Privacy Policy or wish to
              exercise one of your privacy rights, please contact us using the
              following information:
              <br></br>
              <br></br>
              Capital Velocity
              <br></br>
              6565 Spencer St., Suite 207, Las Vegas, NV 89119
              <br></br>
              Email: info@capitalvelocity.com
              <br></br>
            </Typography>
          </Box>
        </Container>
        {/* <Footer2 /> */}
      </div>
    </>
  );
}

export default PrivacyPolicy;

import Head from 'next/head'
import NextLink from 'next/link'

import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import Navbar from '@/components/Shared/Navbar'

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | DeerHacks</title>
      </Head>
      <Fade in timeout={1000}>
        <Container
          sx={{
            flexDirection: 'column',
            alignItems: 'start',
            '& ul': {
              paddingInlineStart: '1rem',
            },
          }}
        >
          <Navbar />
          <Typography variant="h1" alignSelf="center">
            Privacy Policy
          </Typography>
          <Link
            id="overview"
            href="#overview"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Overview
          </Link>
          <Typography variant="body1" gutterBottom>
            DeerHacks (“DeerHacks,” “we,” “our,” or “us”) is committed to protecting your privacy.
            This Privacy Policy, implemented by DeerHacks, is intended to inform Users ("User",
            "Participant", "you") about our practices concerning the processing of personal data
            when participating in DeerHacks within Canada. This Privacy Policy applies to our
            website,{' '}
            <Link
              rel="noopener"
              href="https://deerhacks.ca"
              target="_blank"
              underline="always"
              sx={{ opacity: 0.75 }}
            >
              deerhacks.ca
            </Link>
            {'.'} (hereinafter referred to as “our Service”). By accessing or using our Service and
            participating in the DeerHacks hackathon, you signify that you agree to the collection,
            storage, use, and disclosure of your personal information as described in this Privacy
            Policy and agree to the DeerHacks{' '}
            <Link component={NextLink} href="/code" underline="always" sx={{ opacity: 0.75 }}>
              Code of Conduct
            </Link>
            {'.'}
          </Typography>
          <Link
            id="personal-data-we-collect"
            href="#personal-data-we-collect"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Personal Data We Collect
          </Link>
          <Link
            id="data-collected-automatically"
            href="#data-collected-automatically"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Data Collected Automatically
          </Link>
          <Typography variant="subtitle1">
            We automatically collect certain information when you visit and use our Service.
          </Typography>
          <Typography variant="body1" component="div">
            Data Analytics
            <ul>
              <li>
                We collect analytics data or use third-party analytics tools to measure usage trends
                of our Service. This helps us improve the online experience for visitors. This data
                is anonymous, including visitor numbers and device types.
              </li>
              <li>
                We use services like Cloudflare and Google Analytics for these purposes. Their
                privacy policies can be found at{' '}
                <Link
                  rel="noopener"
                  href="https://cloudflare.com/privacypolicy"
                  target="_blank"
                  underline="always"
                  sx={{ opacity: 0.75 }}
                >
                  Cloudflare Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  rel="noopener"
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  underline="always"
                  sx={{ opacity: 0.75 }}
                >
                  Google Privacy
                </Link>
                .
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" component="div">
            Use of Cookies
            <ul>
              <li>
                Cookies are used for management of the signup process and general administration.
                For example, we may use cookies only as unique session identifiers or to identify
                you as an authorized user of the site (if you access secured areas of the site).
              </li>
              <li>
                Our third party analytics, bug reporting, and DNS providers also use cookies to
                facilitate their services.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" component="div">
            Use of Widgets
            <ul>
              <li>
                For your convenience only, Our Service may include social media features (e.g.,
                LinkedIn, Instagram widgets) and external links to our official partners, not owned,
                operated or controlled by DeerHacks (“External Sites”) that may be of interest to
                you.
              </li>
              <li>
                Please familiarize yourself with the privacy policies of the External Sites as we
                are not responsible for any information you may provide to, or that is collected by,
                those External Sites.
              </li>
            </ul>
          </Typography>
          <Link
            id="data-collected-manually"
            href="#data-collected-manually"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Data Collected Manually
          </Link>
          <Typography variant="subtitle1">
            This includes data collected through direct interactions on our site, such as when you
            apply or sign up as a participant.
          </Typography>
          <Typography variant="body1" component="div">
            Primary User Data
            <ul>
              <li>
                We collect primary data via registration forms for event organization. This
                includes, but is not limited to, first and last name, email address, contact number,
                educational affiliation, and other information we ask you to provide during
                registration.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" component="div">
            Third Party Data
            <ul>
              <li>
                Using third-party sign-ins, such as Discord provides us with certain account
                information. We receive the username, email address, profile picture, and OAuth
                credentials of the Discord account. This information is used for identification and
                sign-in purposes only. You can manage your privacy settings directly with these
                third parties (e.g,{' '}
                <Link
                  rel="noopener"
                  href="https://discord.com/privacy"
                  target="_blank"
                  underline="always"
                  sx={{ opacity: 0.75 }}
                >
                  Discord Privacy Policy
                </Link>
                ).
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" component="div">
            Email Communications
            <ul>
              <li>
                We use Brevo to send emails related to DeerHacks. Your email address is shared with
                Brevo for this purpose. The email service providers do not use this personal data
                for any other purpose and will not transfer or sell your personal data to any other
                third party (e.g,{' '}
                <Link
                  rel="noopener"
                  href="https://brevo.com/legal/privacypolicy"
                  target="_blank"
                  underline="always"
                  sx={{ opacity: 0.75 }}
                >
                  Brevo Privacy Policy
                </Link>
                ). Our emails comply with anti-spam laws, and you can unsubscribe at any time by
                following the link at the bottom of our newsletter emails.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" component="div">
            Optional Survey Data
            <ul>
              <li>
                We may conduct optional surveys to improve DeerHacks and our Service. Survey data
                will always be explicitly labeled as such. Participation in surveys is voluntary and
                does not impact your event eligibility.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" component="div">
            On-Site Participant Data
            <ul>
              <li>
                We collect various data during the event to ensure a smooth experience at DeerHacks.
                For example, we record QR code scans for resource management (e.g, food and
                merchandise) as well as to assess attendance rates and popular activities.
              </li>
            </ul>
          </Typography>
          <Link
            id="how-we-use-personal-data"
            href="#how-we-use-personal-data"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            How We Use Personal Data
          </Link>
          <Typography variant="subtitle1">
            We use personal information solely for organizing and running DeerHacks, including
            communication with participants.
          </Typography>
          <Link
            id="usage-of-automatically-collected-data"
            href="#usage-of-automatically-collected-data"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Usage of Automatically Collected Data
          </Link>
          <Typography variant="body1" component="div">
            <ul>
              <li>
                We monitor metrics like visitor numbers, traffic, and demographic patterns on our
                Service.
              </li>
              <li>
                We diagnose and address technology problems to maintain a high Service standard.
              </li>
              <li>
                We store information so that you will not have to re-enter it during your subsequent
                visits and to implement Service enhancements.
              </li>
            </ul>
          </Typography>
          <Link
            id="usage-of-manually-collected-data"
            href="#usage-of-manually-collected-data"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Usage of Manually Collected Data
          </Link>
          <Typography variant="body1" component="div">
            <ul>
              <li>
                We release anonymized, aggregate data to the public and DeerHacks partners for
                marketing, transparency, and sponsorship purposes.
              </li>
              <li>
                We tailor follow-up communications such as post-event surveys or marketing
                newsletters.
              </li>
              <li>
                We collect feedback and participant interactions are analyzed for continuous
                improvement.
              </li>
              <li>
                We share and create personalized events like workshops, networking opportunities,
                educational courses that align with participant's skills and interests.
              </li>
            </ul>
          </Typography>
          <Link
            id="who-we-share-personal-data-with"
            href="#who-we-share-personal-data-with"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Who We Share Personal Data With
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              Personal information may be disclosed to third parties only with your consent or as
              required by law. This includes sharing information with sponsors or partners, only if
              participants have opted in. We may share your personal data with the following third
              parties:
            </Typography>
            <ul>
              <li>The University of Toronto</li>
              <li>Our event sponsors, for recruitment purposes</li>
              <li>Service providers assisting us in event organization</li>
              <li>Legal and regulatory authorities, where required by law</li>
            </ul>
          </Typography>
          <Link
            id="data-security"
            href="#data-security"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Data Security
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              We are committed to protecting your Personal Information through technical and
              organizational measures against accidental or unlawful destruction, loss, change or
              damage.
            </Typography>
            <ul>
              <li>
                Our Service is hosted on secure Amazon AWS servers and Digital Ocean servers, that
                comply with rigorous, globally recognized security and data protection standards
                (e.g,{' '}
                <Link
                  rel="noopener"
                  href="https://aws.amazon.com/compliance/data-privacy"
                  target="_blank"
                  underline="always"
                  sx={{ opacity: 0.75 }}
                >
                  Amazon AWS Data Policy
                </Link>
                ,{' '}
                <Link
                  rel="noopener"
                  href="https://digitalocean.com/legal/privacy-policy"
                  target="_blank"
                  underline="always"
                  sx={{ opacity: 0.75 }}
                >
                  Digital Ocean Privacy Policy
                </Link>
                ).
              </li>
              <li>
                In the unlikely event of a data breach, affected parties will be notified within 72
                hours, subject to legal or other circumstances.
              </li>
              <li>
                DeerHacks will never send you unsolicited emails or contact you by phone requesting
                your account's login details, credit or debit card information or national
                identification numbers.
              </li>
            </ul>
          </Typography>
          <Link
            id="your-rights"
            href="#your-rights"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Your Rights
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              You can request access, update, or deletion of your personal data at{' '}
              <Link href="mailto:hello@deerhacks.ca" underline="always" sx={{ opacity: 0.75 }}>
                hello@deerhacks.ca
              </Link>
              . Compliance with your request will occur within 30 days, barring legal or exceptional
              circumstances. Please note that deleted data may be retained in our backups for up to
              an additional 60 days, after which they are purged. You have several options to limit
              how much information you share with us:
            </Typography>
            <ul>
              <li>
                Limit information sharing by opting out of non-mandatory fields in our forms and
                communications with you. However, fields marked as mandatory are considered to be
                necessary to our operations and Service that we offer to you. In the event that you
                object to these mandatory fields, you may terminate your activities with us and
                request that we delete all data we have collected from you thus far.
              </li>
              <li>
                Opt out of marketing emails to stop receiving marketing and promotional material
                from us by clicking "unsubscribe" at the bottom of any promotional emails.
              </li>
              <li>
                Use tracking blockers to limit analytics tracking. DeerHacks requires cookies to be
                enabled for our services. However, we do not have individual control over tracking
                activities done by the services outlined in{' '}
                <Link href="#personal-data-we-collect" underline="always" sx={{ opacity: 0.75 }}>
                  Personal Data We Collect
                </Link>
                . Most browsers will allow you to change your cookies preferences. You may also use
                a browser extension to block anonymous analytics activities.
              </li>
            </ul>
          </Typography>
          <Link
            id="changes-to-privacy-policy"
            href="#changes-to-privacy-policy"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Changes to Privacy Policy
          </Link>
          <Typography variant="body1" gutterBottom>
            We reserve the right to modify this Privacy Policy. Review this page periodically for
            changes. Significant changes will be notified and the "last modified" date at the bottom
            of this page will be updated. Continuing to use our Service after we publish changes to
            this Privacy Policy means that you are consenting to the changes.
          </Typography>
          <Link
            id="contact-information"
            href="#contact-information"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Contact Information
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              We are always open to feedback and inquiries! For any questions about this Policy, our
              Service, or if you need assistance, please reach out to us.
            </Typography>
            <ul>
              <li>
                General Inquiries and Feedback: Contact us at{' '}
                <Link href="mailto:hello@deerhacks.ca" underline="always" sx={{ opacity: 0.75 }}>
                  hello@deerhacks.ca
                </Link>{' '}
                for any general questions or feedback regarding DeerHacks.
              </li>
              <li>
                Bug Reporting: If you encounter technical issues or bugs with our Service, please
                email us at{' '}
                <Link href="mailto:hello@deerhacks.ca" underline="always" sx={{ opacity: 0.75 }}>
                  hello@deerhacks.ca
                </Link>
                . Your detailed reports help us continually improve the experience at DeerHacks.
              </li>
              <li>
                Discord Support: Alternatively, for real-time assistance and inquiries, join our
                Discord server. Open a ticket related to your inquiry and our team will be there to
                provide guidance or address your concerns.
              </li>
            </ul>
          </Typography>

          <Typography variant="caption">
            This privacy policy was last modified on December 27th, 2023.
          </Typography>
        </Container>
      </Fade>
    </>
  )
}

export default Privacy

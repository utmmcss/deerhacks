import Head from 'next/head'

import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import Navbar from '@/components/Shared/Navbar'

const Code = () => {
  return (
    <>
      <Head>
        <title>Code of Conduct | DeerHacks</title>
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
            Code of Conduct
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
          <Typography variant="body1">
            Welcome to DeerHacks, the University of Toronto Mississauga (UTM)'s largest hackathon,
            uniting post-secondary students from around the world. As we come together to innovate
            and collaborate, a shared commitment to respect and inclusivity is essential for a
            successful and productive event.
          </Typography>
          <Typography variant="body1">
            This Code of Conduct outlines the expectations for behavior within our community, during
            all activities and communication channels. It is designed to ensure that all individuals
            involved in DeerHacks, regardless of their background, skill level, or interests, can
            enjoy a safe and supportive environment.
          </Typography>
          <Typography variant="body1" gutterBottom>
            We expect everyone to familiarize themselves with this Code of Conduct, as its
            principles are important for a positive experience. By participating in DeerHacks,
            whether in-person or virtually, you agree to adhere to this Code of Conduct. Organizers
            will enforce this code throughout the event.
          </Typography>
          <Link
            id="applicability"
            href="#applicability"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Applicability
          </Link>
          <Typography variant="body1" component="div">
            <ul>
              <li>
                The Code of Conduct applies universally to all individuals{' '}
                <Link href="#all-individuals" underline="always" sx={{ opacity: 0.75 }}>
                  (1)
                </Link>{' '}
                associated with DeerHacks. This includes in-person activities{' '}
                <Link href="#in-person-activities" underline="always" sx={{ opacity: 0.75 }}>
                  (2)
                </Link>{' '}
                at the hackathon and interactions across all related communication channels{' '}
                <Link href="#communication-channels" underline="always" sx={{ opacity: 0.75 }}>
                  (3)
                </Link>
                .
              </li>
              <ul style={{ listStyle: 'none' }}>
                <li>
                  <Link
                    id="all-individuals"
                    href="#all-individuals"
                    underline="always"
                    sx={{ opacity: 0.75 }}
                  >
                    (1)
                  </Link>{' '}
                  Individuals involved in DeerHacks include, but are not limited to, participants,
                  organizers, volunteers, mentors, sponsors, speakers, vendors, staff members, and
                  members of the broader community.
                </li>
                <li>
                  <Link
                    id="in-person-activities"
                    href="#in-person-activities"
                    underline="always"
                    sx={{ opacity: 0.75 }}
                  >
                    (2)
                  </Link>{' '}
                  In-person activities at the hackathon include, but are not limited to, our opening
                  and closing ceremonies, workshops, speaker sessions, tutorials, de-stressor
                  activities, and any events officially partnered with DeerHacks.
                </li>
                <li>
                  <Link
                    id="communication-channels"
                    href="#communication-channels"
                    underline="always"
                    sx={{ opacity: 0.75 }}
                  >
                    (3)
                  </Link>{' '}
                  Communication channels include, but are not limited to, DeerHacks' official social
                  media platforms (e.g., Discord, Instagram, LinkedIn), email communications, and
                  other forms of digital interaction, including direct messages to individuals
                  involved in DeerHacks.
                </li>
              </ul>
              <li>
                By engaging in DeerHacks events or communication channels, individuals agree to
                adhere to this Code of Conduct. Additionally, individuals are expected to comply
                with any specific rules and conditions applicable to their roles or specific
                activities, which are subject to updates and changes without prior notice.
              </li>
            </ul>
          </Typography>
          <Link
            id="expected-behavior"
            href="#expected-behavior"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Expected Behavior
          </Link>
          <Typography variant="subtitle1">
            By embracing these behaviors, DeerHacks becomes more than just an event; it's a
            community where everyone can thrive, learn, and enjoy. Let’s make this hackathon a
            memorable experience filled with growth, collaboration, and respect.
          </Typography>
          <Link
            id="kindness-is-key"
            href="#kindness-is-key"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Kindness is Key
          </Link>
          <Typography variant="body1">
            Kindness and respect towards others are fundamental. Treat fellow participants with the
            same consideration you would expect. Self-care is equally important - looking after your
            own well-being enables you to contribute your best.
          </Typography>
          <Link
            id="communicate-effectively"
            href="#communicate-effectively"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Communicate Effectively
          </Link>
          <Typography variant="body1">
            Clear and friendly communication is key to effective collaboration. It's important to be
            mindful of not just what you say, but how you say it. Active listening is crucial -
            understanding and valuing others' perspectives enriches the experience for everyone.
          </Typography>
          <Link
            id="learn-and-grow-together"
            href="#learn-and-grow-together"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Learn & Grow Together
          </Link>
          <Typography variant="body1">
            Learning is a continuous, shared journey. We value the sharing of ideas and encourage
            open-minded participation in discussions and activities. Stay open to new insights and
            perspectives from others, as each person brings unique experiences and knowledge. Our
            differences are our strengths, contributing to a richer, more creative community.
          </Typography>
          <Link
            id="be-respectful-and-considerate"
            href="#be-respectful-and-considerate"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Be Respectful & Considerate
          </Link>
          <Typography variant="body1">
            We emphasize respect in all interactions. Every participant is expected to speak and act
            considerately, acknowledging the diverse backgrounds and perspectives present. Refrain
            from any form of demeaning, discriminatory, or harassing behavior and speech.
          </Typography>
          <Link
            id="embrace-diversity"
            href="#embrace-diversity"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Embrace Diversity
          </Link>
          <Typography variant="body1">
            At DeerHacks, fostering a culture of support and inclusivity is vital. We encourage
            everyone to constructively offer and accept feedback. If you see someone struggling,
            lend a hand or guide them to someone who can. Embracing diversity in all its forms
            ensures that everyone feels valued and has a sense of belonging.
          </Typography>
          <Link
            id="awareness-and-responsibility"
            href="#awareness-and-responsibility"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Awareness & Responsibility
          </Link>
          <Typography variant="body1">
            Stay aware of your surroundings and the impact of your actions on others. If you notice
            any dangerous situation or someone in distress, or if you observe any violations of this
            Code of Conduct, report it to the Organizers immediately. Even seemingly minor issues
            can have significant impacts and are important for us to address.
          </Typography>
          <Link
            id="protected-grounds"
            href="#protected-grounds"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Protected Grounds
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              DeerHacks is dedicated to providing a safe and comfortable environment and
              harassment-free experience for everyone. No discrimination, based on the following
              grounds and any combination of these grounds, shall be tolerated:
            </Typography>
            <ul>
              <li>Age</li>
              <li>Gender identity and expression</li>
              <li>Sexual orientation</li>
              <li>Sex (including pregnancy and breastfeeding)</li>
              <li>
                Disability (including mental, physical, developmental, or learning disabilities)
              </li>
              <li>Physical appearance</li>
              <li>Body size</li>
              <li>Race</li>
              <li>Ethnicity</li>
              <li>Nationality</li>
              <li>Religion</li>
              <li>Political views</li>
              <li>Previous hackathon attendance or lack thereof</li>
              <li>Computing experience or lack thereof</li>
              <li>Chosen programming language or tech stack</li>
              <li>Any other grounds Organizers deem inappropriate</li>
            </ul>
          </Typography>
          <Link
            id="prohibited-behavior"
            href="#prohibited-behavior"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Prohibited Behavior
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              Behavior that compromises the comfort or safety of DeerHacks participants is
              unacceptable. This section provides examples of such behavior, intended to be
              descriptive but not exhaustive.
            </Typography>
            <ul>
              <li>Advocating or encouraging any prohibited behavior is not allowed.</li>
              <li>Immediate compliance is expected if asked to stop any such behavior.</li>
            </ul>
          </Typography>
          <Link
            id="discrimination-of-any-kind"
            href="#discrimination-of-any-kind"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Discrimination of Any Kind
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              Inclusivity is key to DeerHacks. We expect no form of unequal or different treatment
              towards others. Discrimination, whether intentional or unintentional, is not
              tolerated. Examples of prohibited conduct include, but are not limited to:
            </Typography>
            <ul>
              <li>
                Discriminatory comments or actions related to gender, identity, sexual orientation,
                disability, physical appearance, body size, race, age, religion, ethnicity, or other
                characteristics listed in Protected Grounds, based on one or more incidents.
              </li>
              <li>
                Any actions that impose burdens or deny benefits, disadvantaging certain groups.
              </li>
              <li>
                Displaying or wearing material that qualifies as hate speech or is intolerant of
                human rights.
              </li>
            </ul>
          </Typography>
          <Link
            id="harassment-and-stalking"
            href="#harassment-and-stalking"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Harassment & Stalking
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              Harassment and stalking are severe violations that compromise the safety and respect
              integral to DeerHacks. Examples of prohibited conduct include, but are not limited to:
            </Typography>
            <ul>
              <li>Threats of professional, financial, or physical harm.</li>
              <li>Deliberate intimidation, stalking, or following.</li>
              <li>
                Retaliation against individuals reporting violations or assisting in investigations.
              </li>
              <li>
                Use of electronic devices or digital platforms for illegal, lewd, offensive,
                indecent, or obscene acts or expressions.
              </li>
              <li>
                Taking unauthorized or inappropriate photographs or recordings, especially in
                situations where people have a reasonable expectation of privacy, such as in
                bathrooms or sleeping areas.
              </li>
              <li>
                Any course of comments or actions that are known, or ought reasonably to be known,
                to be unwelcome, offensive, embarrassing, humiliating, or demeaning.
              </li>
            </ul>
          </Typography>
          <Link
            id="sexual-and-gender-based-harassment"
            href="#sexual-and-gender-based-harassment"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Sexual & Gender-Based Harassment
          </Link>

          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              Maintaining a respectful space, free from sexual and gender-based harassment, is
              essential for a positive experience at the event. Examples of prohibited conduct
              include, but are not limited to:
            </Typography>
            <ul>
              <li>
                Displays or use of sexualized pictures, graffiti, recordings, sexualized
                clothing/uniforms/costumes, and anything that creates a sexualized environment.
              </li>
              <li> Inappropriate physical contact or staring.</li>
              <li> Gender-related verbal abuse, threats, or taunting.</li>
              <li> Demands for dates or requests for sexual favors.</li>
              <li> Offensive jokes or comments of sexual nature about an Organizer or attendee.</li>
              <li> Unwelcome sexual or other attention.</li>
            </ul>
          </Typography>
          <Link
            id="disruptive-and-aggressive-behavior"
            href="#disruptive-and-aggressive-behavior"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Disruptive & Aggressive Behavior
          </Link>

          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              A constructive atmosphere is vital for a productive event. Disruptive or aggressive
              behaviors are counterproductive. Examples of prohibited conduct include, but are not
              limited to:
            </Typography>
            <ul>
              <li>Sustained disruption of in-person activities at DeerHacks.</li>
              <li>Physical assault or advocating for harmful behaviors.</li>
              <li>Making aggressive or unreasonable demands or enquiries.</li>
              <li>Shouting, yelling, or using profanity and obscene language.</li>
              <li>Throwing objects or attempting to incite violence.</li>
              <li>
                Making false, disparaging, inflammatory comments or statements about individuals
                involved in DeerHacks, whether directly asserted or insinuated.
              </li>
            </ul>
          </Typography>
          <Link
            id="safety-and-legal-violations"
            href="#safety-and-legal-violations"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Safety & Legal Violations
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              Safety and adherence to legal standards are critical for everyone's well-being at
              DeerHacks. Examples of prohibited conduct include, but are not limited to:
            </Typography>
            <ul>
              <li>Causing unsafe or unsanitary conditions. </li>
              <li>Refusing to leave the premises when directed. </li>
              <li>Bringing a weapon into the event venue. </li>
              <li>Theft, vandalism, or illegal consumption of alcohol or drugs.</li>
            </ul>
          </Typography>
          <Link
            id="reporting-suspected-violations-or-concerns"
            href="#reporting-suspected-violations-or-concerns"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Reporting Suspected Violations or Concerns
          </Link>
          <Link
            id="procedure-of-reporting"
            href="#procedure-of-reporting"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Procedure of Reporting
          </Link>
          <Typography variant="body1">
            If you experience or witness behavior that violates this Code of Conduct, we encourage
            you to report it. You can do so by contacting the Organizing Team at{' '}
            <Link href="mailto:hello@deerhacks.ca" underline="always" sx={{ opacity: 0.75 }}>
              hello@deerhacks.ca
            </Link>
            . We respect the confidentiality of reporters to the greatest extent possible and also
            accept anonymous reports.
          </Typography>
          <Link
            id="investigation-process"
            href="#investigation-process"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Investigation Process
          </Link>
          <Typography variant="body1">
            The Organizing Team is committed to investigating reports promptly and thoroughly.
            Similarly,{' '}
            <b>
              all individuals involved in DeerHacks are expected to cooperate fully in any
              investigation of a harassment or discrimination complaint.
            </b>
          </Typography>
          <Typography>
            The Organizing Team reserves the right not to act on complaints that are deemed
            frivolous or vexatious. The decision to investigate lies solely with the Organizing
            Team.
          </Typography>
          <Link
            id="actions-and-consequences"
            href="#actions-and-consequences"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Actions & Consequences
          </Link>
          <Typography variant="body1" component="div">
            Upon reviewing reported incidents, the Organizing Team will determine appropriate
            actions. Unacceptable behavior may lead to:
            <ul>
              <li>
                Removal from DeerHacks or denial of access to future iterations of DeerHacks and
                partnered events.
              </li>
              <li>Blocking access to DeerHacks resources, including the website.</li>
              <li>Revocation of any awards or recognitions.</li>
              <li>Other necessary measures, without any fee refunds.</li>
            </ul>
            If any action is taken based on a violation, an appeals process will be made available
            for those affected.
          </Typography>
          <Link
            id="third-party-reporting"
            href="#third-party-reporting"
            underline="always"
            variant="h3"
            sx={{ opacity: 1 }}
          >
            Third-Party Reporting
          </Link>
          <Typography variant="body1">
            For serious violations of the Code of Conduct, we may report to external authorities.
            This includes the University of Toronto Mississauga Campus Safety, educational bodies
            for student issues, professional organizations for ethical violations, and legal
            authorities when required by law. All reporting will be in compliance with applicable
            regulations.
          </Typography>
          <Link
            id="campus-safety-and-emergency-line"
            href="#campus-safety-and-emergency-line"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Campus Safety & Emergency Line
          </Link>
          <Typography variant="body1" component="div">
            <Typography variant="subtitle1" color="text.primary">
              During DeerHacks, if you face any emergency, immediate assistance is available.{' '}
              <Link
                rel="noopener"
                href="https://utm.utoronto.ca/campus-police/"
                target="_blank"
                underline="always"
                sx={{ opacity: 0.75 }}
              >
                The University of Toronto Mississauga Campus Safety Special Constable Service
              </Link>{' '}
              operates 24/7 throughout the year. You can reach Campus Safety by phone.
            </Typography>
            <ul>
              <li>
                Emergency Contact:{' '}
                <Link href="tel:905-569-4333" underline="always" sx={{ opacity: 0.75 }}>
                  905-569-4333
                </Link>
              </li>
              <li>
                General Inquiries:{' '}
                <Link href="tel:905-828-5200" underline="always" sx={{ opacity: 0.75 }}>
                  905-828-5200
                </Link>
              </li>
            </ul>
            In any critical situation, your first action should be to call 911. Once you have
            contacted emergency services, inform Campus Safety as well.
          </Typography>

          <Link
            id="major-league-hacking"
            href="#major-league-hacking"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Major League Hacking (MLH)
          </Link>
          <Typography variant="body1">
            DeerHacks is an MLH member event. As part of our partnership, the{' '}
            <Link
              rel="noopener"
              href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
              target="_blank"
              underline="always"
              sx={{ opacity: 0.75 }}
            >
              MLH Code of Conduct
            </Link>{' '}
            applies to all DeerHacks attendees.
          </Typography>

          <Link
            id="changes-to-code-of-conduct"
            href="#changes-to-code-of-conduct"
            underline="always"
            variant="h2"
            sx={{ opacity: 1 }}
            gutterBottom
          >
            Changes to Code of Conduct
          </Link>
          <Typography variant="body1" gutterBottom>
            We reserve the right to modify this Code of Conduct. Review this page periodically for
            changes. Significant changes will be notified and the "last modified" date at the bottom
            of this page will be updated. By continuing to participate in DeerHacks after changes
            are published, you agree to adhere to the updated Code of Conduct.
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
          <Typography variant="body1" gutterBottom>
            We are always open to feedback! For suggestions or questions about the Code of Conduct,
            please contact us at{' '}
            <Link href="mailto:hello@deerhacks.ca" underline="always" sx={{ opacity: 0.75 }}>
              hello@deerhacks.ca
            </Link>
            .
          </Typography>

          <Typography variant="caption">
            This code of conduct was last modified on December 27th, 2023.
          </Typography>
        </Container>
      </Fade>
    </>
  )
}

export default Code

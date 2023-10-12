import AddIcon from '@mui/icons-material/Add'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const FAQ = () => {
  return (
    <Container id="faq" sx={{ flexDirection: 'column' }}>
      <Typography variant="h1">Frequently Asked Questions</Typography>
      <Box
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={{ xs: '1rem', md: '4rem' }}
      >
        <Box component="div" display="flex" flexDirection="column" gap="1rem">
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>What is DeerHacks?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                DeerHacks is University of Toronto Mississauga (UTM)'s largest annual hackathon
                where hackers of all levels are welcome to join us for a weekend of prizes,
                development, and innovation. Organized by the Mathematical and Computational
                Sciences Society (MCSS) with events and workshops provided in collaboration with
                numerous UTM clubs, we welcome you to join us in our third iteration of DeerHacks!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>Dates to keep an eye on?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our tentative schedule for DeerHacks is the weekend of February 16 - 18, 2024. Keep
                an eye on this page and our socials (@deerhacks) for any updates including when
                registration opens for hackers, mentors, and volunteers.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>What workshops and activities to expect?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Participants will be able to attend workshops, competitions, and fun activities to
                enjoy throughout the hackathon. Previously, we have hosted workshops on topics such
                as machine learning, game development, and 3D printing, along with a range of
                activities from CTFs to VR demos. Participants will also have the opportunity to
                present their final project to a panel of experienced judges and industry veterans.
                DeerHacks will enable you to learn something new, network and build connections!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>Is DeerHacks fully in person?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                DeerHacks aims to provide hackers with the best experience and we believe an all
                in-person event best reflects this virtue. Although it is not mandatory to stay on
                campus for the full duration, we highly recommend attending our events.{' '}
                <b>You must be present</b> for registration during the event kickoff and the judging
                period at the end of the hackathon to be eligible for prize contention.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box component="div" display="flex" flexDirection="column" gap="1rem">
          <Accordion>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>Who can participate?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                DeerHacks is targeted towards students who are 18 years or older of all skill levels
                who are eager to learn and meet new people. Hackers must be enrolled in a post
                secondary institution, but not limited to University of Toronto, to be eligible for
                registration.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>How many people can be on a team?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Hackers may work individually or in teams of up to 4 people. Teams can be formed
                before or during the event where we will be hosting networking sessions to help you
                find teammates. All team members must be registered for the hackathon to be eligible
                for prizes.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>Why do I need Discord to apply?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Having a Discord account is mandatory for registration as Discord is our primary
                platform for authentication and communication. Discord authentication provides a
                seamless experience between your DeerHacks dashboard and our Discord server. Our
                server will enable you to receive hackathon updates and access to our network of
                mentors and participants.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>What do I need for DeerHacks?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Along with joining our Discord server, you will need a GitHub and Devpost account
                under your name to be in contention of the hackathon prizes. Most importantly, bring
                a sleeping bag to get comfy, and don't worry about getting hungry; We will provide
                all the food and accommodation throughout the entire event!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Container>
  )
}

export default FAQ

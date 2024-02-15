import { Suspense, useState } from 'react'
import Marquee from 'react-fast-marquee'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import ModalOrganizer, { ModalOrganizerProps } from '@/components/HomePage/ModalOrganizer'

const Team = () => {
  const [open, setOpen] = useState(false)
  const [organizer, setOrganizer] = useState<ModalOrganizerProps>({
    name: '',
    description: '',
    avatar: '',
    emoji: '',
    website: '',
    linkedin: '',
    github: '',
  })

  const Organizer = (props: ModalOrganizerProps) => {
    const { name, avatar } = props

    return (
      <Tooltip title={name} placement="top" sx={{ m: { xs: 0, sm: '0.25rem', m: '0.5rem' } }}>
        <IconButton
          tabIndex={-1}
          onClick={() => {
            setOrganizer(props)
            setOpen(true)
          }}
        >
          <Avatar src={avatar} alt={name} sx={{ width: 65, height: 65, filter: 'saturate(0.9)' }} />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <>
      <Container
        data-aos="fade"
        data-aos-offset="100"
        data-aos-duration="1200"
        data-aos-once="false"
        sx={{
          gap: '1rem 2.5rem',
          textAlign: { xs: 'center', lg: 'left' },
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          pt: '3rem !important',
          pb: '0 !important',
        }}
      >
        <Box component="div" minWidth="fit-content">
          <Typography
            variant="h2"
            gutterBottom
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-offset="100"
            data-aos-once="false"
          >
            The Organizing Team
          </Typography>
          <Typography
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-offset="100"
            data-aos-once="false"
          >
            & special thanks to all staff ❤️
          </Typography>
        </Box>
        <Marquee
          play={!open}
          autoFill
          direction="right"
          speed={60}
          pauseOnHover
          style={{
            padding: '0.5rem 0',
            maskImage:
              'linear-gradient(to right,transparent,black,black,black,black,black,black,transparent)',
            WebkitMaskImage:
              'linear-gradient(to right,transparent,black,black,black,black,black,black,transparent)',
          }}
        >
          <Organizer
            name="Anthony Tedja"
            description="i stare at the 3D model the same way how i look at my fridge"
            avatar="/team/anthony.webp"
            emoji="😘"
            website="https://anthonytedja.com"
            linkedin="https://linkedin.com/in/anthonytedja"
            github="https://github.com/anthonytedja"
          />
          <Organizer
            name="Nina Ricci Lu"
            description="stonks master by day, mcss sugar daddy by night"
            avatar="/team/nina.webp"
            emoji="💵"
            website="https://ninariccilu.com"
            linkedin="https://linkedin.com/in/ninaricci29"
          />
          <Organizer
            name="Ivan Varquez"
            description="i'm 5'7 but i tell people i'm 5'3¾ online so they say i look taller in person"
            avatar="/team/ivan.webp"
            emoji="☕"
            website="https://varquezi.com"
            linkedin="https://linkedin.com/in/ivanvarquez"
            github="https://github.com/varquezi"
          />
          <Organizer
            name="Srishti Gangolly"
            description="silly, goofy, here for giggles"
            avatar="/team/srishti.webp"
            emoji="😜"
            linkedin="https://linkedin.com/in/srishti-gangolly"
          />
          <Organizer
            name="Shiva Mulwani"
            description="money don't sleep"
            avatar="/team/shiva.webp"
            emoji="🤭"
            website="https://shivamulwani.netlify.app"
            linkedin="https://linkedin.com/in/shiva-mulwani"
            github="https://github.com/Multivalence"
          />
          <Organizer
            name="Jasmine Guruparan"
            description="monke"
            avatar="/team/jasmine.webp"
            emoji="⚰️"
            website="https://www.youtube.com/watch?v=mUk2x4r6hOY"
            linkedin="https://linkedin.com/in/jasmine-guruparan-625395156"
          />
          <Organizer
            name="Vishnu Manoj"
            description="too brainy 200 furious"
            avatar="/team/vishnu.webp"
            emoji="😁"
            linkedin="http://linkedin.com/in/vishnumanoj211101"
          />
          <Organizer
            name="Carina Rastarhuyeva"
            description="girl boss"
            avatar="/team/carina.webp"
            emoji="👸"
            linkedin="https://linkedin.com/in/crastars"
            github="https://github.com/crastars"
          />
          <Organizer
            name="Akira Takaki"
            description="professional bag fumbler"
            avatar="/team/akira.webp"
            emoji="🥹"
            website="http://www.akiratakaki.com"
            linkedin="https://linkedin.com/in/a1t"
          />
        </Marquee>
      </Container>
      <Suspense>
        <ModalOrganizer open={open} onClose={() => setOpen(false)} {...organizer} />
      </Suspense>
    </>
  )
}

export default Team

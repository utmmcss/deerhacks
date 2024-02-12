import { Fragment, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import MCS from '@/components/HomePage/Sponsors/Assets/MCS'
import MCSS from '@/components/HomePage/Sponsors/Assets/MCSS'
import Sponsor, { Tier } from '@/components/HomePage/Sponsors/Sponsor'

const tabs: FeaturedSponsorProps[] = [
  {
    title: 'UTM MCSS',
    description:
      'MCSS is the official academic society for the Mathematics and Computational Sciences Department at the University of Toronto Mississauga and partner of DeerHacks.',
    link: 'https://mcss.club',
    logo: <MCSS />,
    showList: false,
    tier: 'diamond',
  },
  {
    title: 'MCS Department',
    description:
      'Our Department combines the beauty, innovation and power of Mathematics, Computer Science, and Statistics to stimulate your mind and provide you with tools for the modern technology-driven world.',
    link: 'https://utm.utoronto.ca/math-cs-stats',
    logo: <MCS />,
    showList: true,
    tier: 'platinum',
  },
]

const Featured = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleChange = ({}, value: number) => {
    setActiveTab(value)
  }

  return (
    <>
      <Grid item xs data-aos="fade" data-aos-offset="100" data-aos-once="false">
        <Tabs variant="scrollable" value={activeTab} onChange={handleChange}>
          {tabs.map((tab) => (
            <Tab key={tab.title} label={tab.title} />
          ))}
        </Tabs>
      </Grid>
      {tabs.map((tab, index) => (
        <Fragment key={tab.title}>
          <CustomTabPanel value={activeTab} index={index}>
            <Grid
              container
              item
              xs={12}
              md={6}
              data-aos="fade"
              data-aos-offset="100"
              data-aos-once="false"
            >
              <Tooltip title={tab.title}>
                <Button
                  variant="contained"
                  fullWidth
                  href={tab.link}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    height: '14rem',
                    borderRadius: '1rem',
                    background: 'white',
                    p: { xs: '1rem', lg: '2rem' },
                  }}
                >
                  {tab.logo}
                </Button>
              </Tooltip>
            </Grid>
            <Grid container item xs={12} md={6}>
              <Box
                component="div"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                textAlign={{ xs: 'center', md: 'start' }}
              >
                <Typography
                  variant="h2"
                  mb="1rem"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-offset="100"
                  data-aos-once="false"
                >
                  {tab.title}
                </Typography>
                <Typography
                  mb="1rem"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-offset="100"
                  data-aos-once="false"
                >
                  {tab.description}
                </Typography>
              </Box>
            </Grid>
          </CustomTabPanel>
          {tab.showList && (
            <Sponsor name={tab.title} logo={tab.logo} link={tab.link} tier={tab.tier} />
          )}
        </Fragment>
      ))}
    </>
  )
}

type FeaturedSponsorProps = {
  title: string
  description: string
  link: string
  logo: React.ReactNode
  showList: boolean
  tier: Tier
}

type TabPanelProps = {
  children?: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props

  return (
    <Grid
      container
      item
      role="tabpanel"
      hidden={value !== index}
      spacing={{ xs: 2, md: 4 }}
      sx={{ p: value !== index ? '0 !important' : 'initial' }}
    >
      {value === index && <>{children}</>}
    </Grid>
  )
}

export default Featured

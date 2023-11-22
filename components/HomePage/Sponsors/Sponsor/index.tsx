import { ReactNode } from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'

/**
 * Will add higher tiers manually
 */
type Tier = 'gold' | 'silver' | 'bronze'

type Props = {
  name: string
  logo: ReactNode
  link: string
  tier: Tier
}

const tierToSize = (tier: Tier) => {
  switch (tier) {
    case 'gold':
      return 12
    case 'silver':
      return 6
    case 'bronze':
      return 4
  }
}

const tierToHeight = (tier: Tier) => {
  switch (tier) {
    case 'gold':
      return '10rem'
    case 'silver':
      return '8rem'
    case 'bronze':
      return '6rem'
  }
}

const Sponsor = (props: Props) => {
  const { name, logo, link, tier } = props

  return (
    <Grid
      container
      item
      xs={tierToSize(tier)}
      data-aos="fade"
      data-aos-offset="100"
      data-aos-once="false"
    >
      <Tooltip title={name}>
        <Button
          variant="contained"
          fullWidth
          href={link}
          target="_blank"
          rel="noopener"
          sx={{
            height: { xs: tierToHeight(tier), md: '10rem' },
            borderRadius: '1rem',
            background: 'white',
            p: { xs: '1rem', lg: '2rem' },
          }}
        >
          {logo}
        </Button>
      </Tooltip>
    </Grid>
  )
}

export default Sponsor

import AdjustIcon from '@mui/icons-material/Adjust'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import Grid from '@mui/material/Grid'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import StepContent from '@mui/material/StepContent'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import LoadingButton from '@/components/Dashboard/LoadingButton'
import { formKeys, FormSections } from '@/types/Registration'

const StyledStepConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#fff',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#fff',
    },
  },
}))

const getStepDisabled = (stepIndex: number, activeStep: number, formSections: FormSections) => {
  if (stepIndex === activeStep) return false

  // disable all future steps after an invalid step
  for (var i = 0; i < formKeys.length; i++) {
    const stepKey = formKeys[i]
    if (stepKey === 'Review') return false
    if (!formSections[stepKey].form.formState.isValid) {
      return stepIndex > i
    }
  }
}

const getStepIcon = (stepIndex: number, activeStep: number, formSections: FormSections) => {
  const stepKey = formKeys[stepIndex]
  const opacity = stepIndex === activeStep ? 1 : 0.5

  if (stepKey !== 'Review') {
    const form = formSections[stepKey].form

    if (form.formState.isValid) return <TaskAltRoundedIcon color="success" sx={{ opacity }} />

    if (Object.keys(form.formState.errors).length) {
      return <ErrorOutlineRoundedIcon color="error" />
    }
  }
  return <AdjustIcon color="secondary" sx={{ opacity }} />
}

type Props = {
  activeStep: number
  formSections: FormSections
  handleAccordionChange: (index: number) => void
  saveForLaterButton: {
    onClick: () => void
    isLoading: boolean
    disabled: boolean
  }
}

const RegistrationStepper = (props: Props) => {
  const { activeStep, formSections, handleAccordionChange, saveForLaterButton } = props

  return (
    <Grid
      container
      flexDirection="column"
      item
      xs={0}
      md={3}
      gap={2}
      alignSelf="start"
      position="sticky"
      top={0}
      alignItems={{ xs: 'center', md: 'start' }}
      padding={1}
    >
      <LoadingButton
        loading={saveForLaterButton.isLoading}
        disabled={saveForLaterButton.disabled}
        size="medium"
        onClick={saveForLaterButton.onClick}
        fullWidth
        sx={{ maxWidth: '300px' }}
      >
        Save as Draft
      </LoadingButton>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        connector={<StyledStepConnector />}
        sx={{ width: '100%', p: '0.5rem' }}
      >
        {formKeys.map((section, i) => (
          <Step key={section} disabled={getStepDisabled(i, activeStep, formSections)}>
            <StepButton
              icon={getStepIcon(i, activeStep, formSections)}
              onClick={() => handleAccordionChange(i)}
              sx={{
                transition: '0.3s all ease',
                borderRadius: '0.5rem',
                '&:hover, &:focus-visible': {
                  textDecoration: 'underline',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              <Typography
                color={
                  !getStepDisabled(i, activeStep, formSections) ? 'text.primary' : 'text.secondary'
                }
              >
                {formSections[section].heading}
              </Typography>
            </StepButton>
            <StepContent sx={{ transition: '0.3s all ease', pt: i === activeStep ? '1rem' : 0 }}>
              {formSections[section].subHeadings.map((subHeading) => (
                <Typography key={`${section} - ${subHeading}`}>{subHeading}</Typography>
              ))}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Grid>
  )
}

export default RegistrationStepper

import Head from 'next/head'
import { Suspense, useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'

import AdjustIcon from '@mui/icons-material/Adjust'
import Check from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import Modal from '@/components/Dashboard/Modal'
import AboutYou from '@/components/Dashboard/RegistrationForms/AboutYou'
import DeerhacksForm from '@/components/Dashboard/RegistrationForms/Deerhacks'
import ExperienceForm from '@/components/Dashboard/RegistrationForms/Experience'
import {
  appToFormMap,
  formToAppMap,
  getSchoolOptions,
} from '@/components/Dashboard/RegistrationForms/helpers'
import OpenEndedResponsesForm from '@/components/Dashboard/RegistrationForms/OpenEndedResponses'
import FormReview from '@/components/Dashboard/RegistrationForms/Review'
import BackButton from '@/components/Shared/BackButton'
import FullPageLoader from '@/components/Shared/FullPageLoader'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useToast } from '@/contexts/Toast'
import { useApplicationUpdate } from '@/hooks/Application/useApplicationUpdate'
import { useApplicationGet } from '@/hooks/Application/userApplicationGet'
import { useSchoolList } from '@/hooks/Application/useSchoolList'
import Error401Page from '@/pages/401'
import Error404Page from '@/pages/404'
import Error500Page from '@/pages/500'
import { Application } from '@/types/Application'
import { User } from '@/types/User'
import {
  AboutYouZodForm,
  aboutYouZodForm,
  DeerhacksZodForm,
  deerhacksZodForm,
  ExperienceZodForm,
  experienceZodForm,
  OpenEndedResponsesZodForm,
  openEndedResponsesZodForm,
} from '@/types/Zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

const formKeys = ['AboutYou', 'Experience', 'OpenEndedResponses', 'DeerHacks', 'Review'] as const

type Section<Values extends FieldValues> = {
  heading: string
  subHeadings: readonly string[]
  form: UseFormReturn<Values>
}

type FormSections = {
  AboutYou: Section<AboutYouZodForm>
  Experience: Section<ExperienceZodForm>
  OpenEndedResponses: Section<OpenEndedResponsesZodForm>
  DeerHacks: Section<DeerhacksZodForm>
  Review: Omit<Section<any>, 'form'>
}

type Props = {
  user: User
  savedApplication: Application
  schoolOptions: string[]
}

const Registration = (props: Props) => {
  const { user, savedApplication, schoolOptions } = props

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { setToast } = useToast()

  const [application, setApplication] = useState(savedApplication)

  const [openConfirmation, setOpenConfirmation] = useState(false)

  const formSections: FormSections = {
    AboutYou: {
      heading: 'About You',
      subHeadings: [
        'Personal Information',
        'Profile Details',
        'Location',
        'Emergency Contact',
        'Event Preferences',
      ],
      form: useForm<AboutYouZodForm>({
        mode: 'onChange',
        resolver: zodResolver(aboutYouZodForm),
        defaultValues: appToFormMap.AboutYou(application),
      }),
    },
    Experience: {
      heading: 'Experience',
      subHeadings: ['Education', 'Professional Journey', 'Hacker Details'],
      form: useForm<ExperienceZodForm>({
        mode: 'onChange',
        resolver: zodResolver(experienceZodForm(schoolOptions as [string, ...string[]])),
        defaultValues: appToFormMap.Experience(application, schoolOptions),
      }),
    },
    OpenEndedResponses: {
      heading: 'Open Ended Responses',
      subHeadings: ['DeerHacks Pitch', 'Past Project', 'Future Technology'],
      form: useForm<OpenEndedResponsesZodForm>({
        mode: 'onChange',
        resolver: zodResolver(openEndedResponsesZodForm),
        defaultValues: appToFormMap.OpenEndedResponses(application),
      }),
    },
    DeerHacks: {
      heading: 'DeerHacks',
      subHeadings: ['Reach', 'Meals', 'MLH Permissions'],
      form: useForm<DeerhacksZodForm>({
        mode: 'onChange',
        resolver: zodResolver(deerhacksZodForm),
        defaultValues: appToFormMap.DeerHacks(application),
      }),
    },
    Review: { heading: 'Review & Submit', subHeadings: [] },
  }

  const { mutate: applicationUpdate } = useApplicationUpdate()
  const onSubmit = (props: { is_draft: boolean }) => {
    saveForm() // hanatodo currently open page doesn't get saved before it gets submitted
    const { is_draft } = props
    applicationUpdate(
      { is_draft, application },
      {
        onSuccess: () => {
          if (is_draft) {
            setToast({
              type: 'success',
              message: 'Form saved. This does NOT count as a submission.',
            })
          } else {
            window.scrollTo(0, 0)
            setToast({
              type: 'success',
              message: 'Form submitted successfully.',
            })
          }
        },
        onError: () => {
          setToast({
            type: 'error',
            message: 'Something went wrong, please try again.',
          })
        },
      }
    )
  }

  const saveForm = () => {
    const currentStep = formKeys[activeStep]
    // save state and update errors when accordion is closed
    // typescript complains unless its in this switch statement :(
    switch (currentStep) {
      case 'AboutYou':
        setApplication(
          formToAppMap[currentStep](formSections[currentStep].form.getValues(), application)
        )
        formSections[currentStep].form.trigger()
        break
      case 'Experience':
        setApplication(
          formToAppMap[currentStep](formSections[currentStep].form.getValues(), application)
        )
        formSections[currentStep].form.trigger()
        break
      case 'OpenEndedResponses':
        setApplication(
          formToAppMap[currentStep](formSections[currentStep].form.getValues(), application)
        )
        formSections[currentStep].form.trigger()
        break
      case 'DeerHacks':
        setApplication(
          formToAppMap[currentStep](formSections[currentStep].form.getValues(), application)
        )
        formSections[currentStep].form.trigger()
        break
    }
  }

  const [activeStep, setActiveStep] = useState(() => {
    // hanatodo form not loaded fast enough so first form is invalid here
    /*
    for (var i = 0; i < formKeys.length; i++) {
      const stepKey = formKeys[i]
      if (stepKey === 'Review') return i
      if (!formSections[stepKey].form.formState.isValid) {
        return i
      }
    }
    */
    return -1
  })

  const handleNextStep = () => {
    const closedStep = formKeys[activeStep]
    if (closedStep !== 'Review') {
      formSections[closedStep].form.trigger()
    }
    setActiveStep((step) => step + 1)
  }

  const handleAccordionChange = (i: number) => {
    saveForm()
    setActiveStep((curr) => (curr === i ? -1 : i))
  }

  const getStepDisabled = (stepIndex: number, activeIndex: number) => {
    if (stepIndex === activeIndex) return false

    // disable all future steps after an invalid step
    for (var i = 0; i < formKeys.length; i++) {
      const stepKey = formKeys[i]
      if (stepKey === 'Review') return false
      if (!formSections[stepKey].form.formState.isValid) {
        return stepIndex > i
      }
    }
  }

  const getStepIcon = (i: number) => {
    const stepKey = formKeys[i]
    const color = i <= activeStep ? 'white' : 'grey'

    if (stepKey !== 'Review') {
      const form = formSections[stepKey].form

      if (form.formState.isValid) return <Check style={{ color }} />

      if (Object.keys(form.formState.errors).length) {
        return <ErrorIcon color="error" />
      }
    }
    return <FiberManualRecordIcon style={{ color }} />
  }

  // hanatodo styles
  // accordion :)
  // hover on steps you can click on (or make clickable stuff look different somehow) (make previous stuff white? idk)
  // want to scroll to top of accordion when clicked :)
  // want stepper to scroll with screen on desktop

  const RegistrationStepper = () => {
    return (
      <Grid item xs={0} md={3}>
        <Stepper activeStep={activeStep} orientation="vertical" connector={<StyledStepConnector />}>
          {formKeys.map((section, i) => (
            <Step key={section} disabled={getStepDisabled(i, activeStep)}>
              <StepButton icon={getStepIcon(i)} onClick={() => handleAccordionChange(i)}>
                {formSections[section].heading}
              </StepButton>
              <StepContent>
                {formSections[section].subHeadings.map((subHeading) => (
                  <Typography key={`${section} - ${subHeading}`}>{subHeading}</Typography>
                ))}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <Button
          onClick={() => {
            onSubmit({ is_draft: true })
          }}
        >
          Save for Later
        </Button>
      </Grid>
    )
  }

  return (
    <Grid container flexGrow={1}>
      {!isMobile && <RegistrationStepper />}
      {isMobile && (
        <Grid
          position="fixed"
          left={0}
          bottom={0}
          width="100%"
          zIndex={100}
          style={{ backgroundColor: 'black' }}
        >
          <Accordion>
            <AccordionSummary>
              <Stepper
                activeStep={activeStep}
                connector={<StyledStepConnector />}
                style={{ width: '100%' }}
              >
                {formKeys.map((section, i) => (
                  <Step key={section}>
                    <StepLabel icon={getStepIcon(i)}></StepLabel>
                  </Step>
                ))}
              </Stepper>
              {
                // hanatodo does it even need to expand? maybe just the save for later button???
              }
              <ExpandLessIcon />
            </AccordionSummary>
            <AccordionDetails>
              <RegistrationStepper />
            </AccordionDetails>
          </Accordion>
        </Grid>
      )}
      <Grid item xs={12} md={9}>
        {formKeys.map((section, i) => {
          return (
            <Accordion
              expanded={activeStep == i}
              disabled={getStepDisabled(i, activeStep)}
              onChange={() => handleAccordionChange(i)}
              key={section}
              sx={{
                width: '100%',
                padding: { md: '1rem' },
                backgroundColor: activeStep == i ? 'navy' : 'transparent',
              }}
            >
              <AccordionSummary>
                <Typography>{formSections[section].heading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {section == 'AboutYou' && (
                  <AboutYou
                    user={user}
                    form={formSections[section].form}
                    onNext={(data: AboutYouZodForm) => {
                      setApplication(formToAppMap.AboutYou(data, application))
                      handleNextStep()
                    }}
                  />
                )}
                {section == 'Experience' && (
                  <ExperienceForm
                    form={formSections[section].form}
                    onNext={(data: ExperienceZodForm) => {
                      setApplication(formToAppMap.Experience(data, application))
                      handleNextStep()
                    }}
                  />
                )}
                {section == 'OpenEndedResponses' && (
                  <OpenEndedResponsesForm
                    form={formSections[section].form}
                    onNext={(data: OpenEndedResponsesZodForm) => {
                      setApplication(formToAppMap.OpenEndedResponses(data, application))
                      handleNextStep()
                    }}
                  />
                )}
                {section == 'DeerHacks' && (
                  <DeerhacksForm
                    form={formSections[section].form}
                    onNext={(data: DeerhacksZodForm) => {
                      setApplication(formToAppMap.DeerHacks(data, application))
                      handleNextStep()
                    }}
                  />
                )}
                {section == 'Review' && (
                  <FormReview
                    user={user}
                    application={application}
                    onSubmit={() => setOpenConfirmation(true)}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Grid>
      <Suspense>
        <Modal
          open={openConfirmation}
          setOpen={setOpenConfirmation}
          title="Submit Application"
          content={
            <Typography>
              You will not be able to re-submit your application. Are you sure you want to proceed?
            </Typography>
          }
          onSubmit={() => onSubmit({ is_draft: false })}
        />
      </Suspense>
    </Grid>
  )
}

const RegistrationLoader = () => {
  const { toggles } = useFeatureToggle()
  const { user, loading, authenticated } = useAuth()

  const allowedStatuses = ['registering', 'applied', 'selected', 'accepted', 'attended', 'rejected']

  const {
    data,
    isLoading: applicationLoading,
    isError: applicationError,
  } = useApplicationGet({
    enabled: user?.status && allowedStatuses.includes(user.status),
  })

  const { data: schoolList, isLoading: schoolLoading } = useSchoolList()

  if (!toggles.dashboard) return <Error404Page />
  if (!loading && !authenticated) return <Error401Page />

  if (user?.status && !allowedStatuses.includes(user.status)) {
    return (
      <FullPageLoader
        show
        pulse={false}
        text="Invalid user status. Cannot register."
        buttonText="Go Back"
        buttonLink="/dashboard"
      />
    )
  }

  if (!toggles.signupHacker && user?.status && user.status === 'registering') {
    return (
      <FullPageLoader
        show
        pulse={false}
        text="Sign up period has ended."
        buttonText="Go Back"
        buttonLink="/dashboard"
      />
    )
  }

  if (applicationError) return <Error500Page />

  return (
    <>
      <Head>
        <title>Registration | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user || applicationLoading || schoolLoading ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container
            sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <BackButton navbar />
            <Typography
              variant="h1"
              display="flex"
              alignItems="center"
              textAlign="left"
              gap="0.5rem"
            >
              <AdjustIcon color="error" fontSize="inherit" />
              Hacker Registration
            </Typography>
            {user.status === 'registering' ? (
              <Registration
                user={user}
                savedApplication={data.application}
                schoolOptions={getSchoolOptions(schoolList ?? [])}
              />
            ) : (
              <FormReview user={user} application={data.application} />
            )}
          </Container>
        </Fade>
      )}
    </>
  )
}

export default RegistrationLoader

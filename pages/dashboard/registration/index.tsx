import Head from 'next/head'
import { useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'

import Check from '@mui/icons-material/Check'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'

import AboutYou from '@/components/Dashboard/RegistrationForms/AboutYou'
import DeerhacksForm from '@/components/Dashboard/RegistrationForms/Deerhacks'
import ExperienceForm from '@/components/Dashboard/RegistrationForms/Experience'
import { appToFormMap, formToAppMap } from '@/components/Dashboard/RegistrationForms/helpers'
import OpenEndedResponsesForm from '@/components/Dashboard/RegistrationForms/OpenEndedResponses'
import FormReview from '@/components/Dashboard/RegistrationForms/Review'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import Navbar from '@/components/Shared/Navbar'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useApplicationUpdate } from '@/hooks/Application/useApplicationUpdate'
import { useApplicationGet } from '@/hooks/Application/userApplicationGet'
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
}

const Registration = (props: Props) => {
  const { user, savedApplication } = props

  const [application, setApplication] = useState(savedApplication)

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
        resolver: zodResolver(experienceZodForm),
        defaultValues: appToFormMap.Experience(application),
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

  const [activeStep, setActiveStep] = useState(0)
  const handleNextStep = () => {
    setActiveStep((step) => step + 1)
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

  const { mutate: applicationUpdate } = useApplicationUpdate()
  const onSubmit = (props: { is_draft: boolean }) => {
    const { is_draft } = props
    applicationUpdate(
      { is_draft, application },
      {
        onSuccess: () => {
          console.log('updated')
          if (is_draft) {
            // hanatodo go to home
          } else {
            // hanatodo go to a you have submitted page
          }
        },
        onError: () => {
          console.log('oh no')
          // hanatodo something went wrong toast :D
        },
      }
    )
  }

  const handleAccordionChange = (i: number) => {
    const closedStep = formKeys[activeStep]
    // save state and update errors when accordion is closed
    // typescript complains unless its in this switch statement :(
    switch (closedStep) {
      case 'AboutYou':
        setApplication(
          formToAppMap[closedStep](formSections[closedStep].form.getValues(), application)
        )
        formSections[closedStep].form.trigger()
        break
      case 'Experience':
        setApplication(
          formToAppMap[closedStep](formSections[closedStep].form.getValues(), application)
        )
        formSections[closedStep].form.trigger()
        break
      case 'OpenEndedResponses':
        setApplication(
          formToAppMap[closedStep](formSections[closedStep].form.getValues(), application)
        )
        formSections[closedStep].form.trigger()
        break
      case 'DeerHacks':
        setApplication(
          formToAppMap[closedStep](formSections[closedStep].form.getValues(), application)
        )
        formSections[closedStep].form.trigger()
        break
    }

    setActiveStep((curr) => (curr === i ? -1 : i))
  }

  // hanatodo disable submit when toggles.signupHacker (can still see review / what they submitted)
  // only show review page if toggles.signupHacker is false

  return (
    <Grid container flexGrow={1}>
      <Grid item xs={0} md={3}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {formKeys.map((section, i) => (
            <Step key={section}>
              <StepLabel
                icon={
                  i < activeStep ? (
                    // hanatodo make this better later
                    <Check />
                  ) : (
                    <FiberManualRecordIcon
                      style={{
                        color: i == activeStep ? 'white' : 'grey',
                      }}
                    />
                  )
                }
              >
                {formSections[section].heading}
              </StepLabel>
              <StepContent>
                {formSections[section].subHeadings.map((subHeading) => (
                  <Typography key={`${section} - ${subHeading}`}>{subHeading}</Typography>
                ))}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <Button onClick={() => onSubmit({ is_draft: true })}>Save</Button>
      </Grid>
      <Grid item xs={12} md={9}>
        {formKeys.map((section, i) => {
          return (
            <Accordion
              expanded={activeStep == i}
              disabled={getStepDisabled(i, activeStep)}
              onChange={() => handleAccordionChange(i)}
              key={section}
              style={{ width: '100%' }}
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
                    onSubmit={() => onSubmit({ is_draft: false })}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Grid>
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

  if (!toggles.dashboard) return <Error404Page />
  if (!loading && !authenticated) return <Error401Page />

  if (applicationError) return <Error500Page />

  // hanatodo if not allowed status, show some other thing

  return (
    <>
      <Head>
        <title>Registration | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user || applicationLoading ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container
            sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Navbar
            // hanatodo add some way to get back to dashboard
            />
            <Registration user={user} savedApplication={data.application} />
          </Container>
        </Fade>
      )}
    </>
  )
}

export default RegistrationLoader

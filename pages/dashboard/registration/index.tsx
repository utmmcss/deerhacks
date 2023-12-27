import Head from 'next/head'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import Modal from '@/components/Dashboard/Modal'
import AboutYou from '@/components/Dashboard/RegistrationForms/AboutYou'
import DeerhacksForm from '@/components/Dashboard/RegistrationForms/Deerhacks'
import ExperienceForm from '@/components/Dashboard/RegistrationForms/Experience'
import { appToFormMap, formToAppMap } from '@/components/Dashboard/RegistrationForms/helpers'
import OpenEndedResponsesForm from '@/components/Dashboard/RegistrationForms/OpenEndedResponses'
import RegistrationDrawer from '@/components/Dashboard/RegistrationForms/RegistrationDrawer'
import RegistrationStepper from '@/components/Dashboard/RegistrationForms/RegistrationStepper'
import FormReview from '@/components/Dashboard/RegistrationForms/Review'
import BackButton from '@/components/Shared/BackButton'
import FullPageLoader from '@/components/Shared/FullPageLoader'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useToast } from '@/contexts/Toast'
import { useApplicationUpdate } from '@/hooks/Application/useApplicationUpdate'
import { useApplicationGet } from '@/hooks/Application/userApplicationGet'
import { useResumeGet } from '@/hooks/Application/useResumeGet'
import Error401Page from '@/pages/401'
import Error418Page from '@/pages/418'
import Error500Page from '@/pages/500'
import theme from '@/styles/theme'
import { Application, ApplicationUpdateReq } from '@/types/Application'
import { formKeys, FormSections } from '@/types/Registration'
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

type Props = {
  user: User
  savedApplication: Application
}

const Registration = (props: Props) => {
  const { user, savedApplication } = props

  const router = useRouter()
  const { setToast } = useToast()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [application, setApplication] = useState(savedApplication)
  const [activeStep, setActiveStep] = useState(0)
  const [openDrawer, setOpenDrawer] = useState(false)
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

  const { isLoading, mutate: applicationUpdate } = useApplicationUpdate()
  const onSubmit = (props: { req: ApplicationUpdateReq; hideToast?: boolean }) => {
    const { req, hideToast = false } = props
    applicationUpdate(req, {
      onSuccess: () => {
        if (req.is_draft) {
          if (!hideToast) {
            setToast({
              type: 'success',
              message: 'Application saved as draft.',
            })
          }
          // reset so can reload without warning if saved
          formKeys.forEach((key) => {
            if (key !== 'Review')
              formSections[key].form.reset(appToFormMap[key](req.application), {
                keepErrors: true,
              })
          })
        } else {
          scrollToTop()
          setToast({
            type: 'success',
            message: 'Your application was submitted successfully!',
          })
        }
      },
      onError: () => {
        setToast({
          type: 'error',
          message: 'Something went wrong, please try again.',
        })
      },
    })
  }

  const saveForm = () => {
    var updatedApp = application

    const currentStep = formKeys[activeStep]
    if (!currentStep || currentStep === 'Review') return updatedApp

    switch (currentStep) {
      case 'AboutYou':
        updatedApp = formToAppMap[currentStep](
          formSections[currentStep].form.getValues(),
          application
        )
        break
      case 'Experience':
        updatedApp = formToAppMap[currentStep](
          formSections[currentStep].form.getValues(),
          application
        )
        break
      case 'OpenEndedResponses':
        updatedApp = formToAppMap[currentStep](
          formSections[currentStep].form.getValues(),
          application
        )
        break
      case 'DeerHacks':
        updatedApp = formToAppMap[currentStep](
          formSections[currentStep].form.getValues(),
          application
        )
        break
    }
    setApplication(updatedApp)
    return updatedApp
  }

  const onSaveLater = () => {
    onSubmit({
      req: {
        is_draft: true,
        application: saveForm(), // state not updated fast enough so have to pass it in
      },
    })
  }

  const handleNextStep = (newApp: Application) => {
    const closedStep = formKeys[activeStep]
    if (closedStep !== 'Review') {
      formSections[closedStep].form.trigger()
    }
    setActiveStep((step) => step + 1)
    scrollToTop()
    setApplication(newApp)
  }

  const handleAccordionChange = (i: number) => {
    saveForm()
    scrollToTop()
    setActiveStep(i)
  }

  const unsavedChanges =
    Object.keys(formSections.AboutYou.form.formState.dirtyFields).length ||
    Object.keys(formSections.Experience.form.formState.dirtyFields).length ||
    Object.keys(formSections.OpenEndedResponses.form.formState.dirtyFields).length ||
    Object.keys(formSections.DeerHacks.form.formState.dirtyFields).length

  useEffect(() => {
    const handleWindowClose = (e: any) => {
      if (!unsavedChanges) return
      e.preventDefault()
      return (e.returnValue = 'You have unsaved changes')
    }
    const handleBrowseAway = () => {
      if (!unsavedChanges) return
      if (window.confirm('You have unsaved changes')) return
      router.events.emit('routeChangeError')
      throw 'routeChange aborted.'
    }
    window.addEventListener('beforeunload', handleWindowClose)
    router.events.on('routeChangeStart', handleBrowseAway)
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
      router.events.off('routeChangeStart', handleBrowseAway)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unsavedChanges])

  return (
    <Grid container flexGrow={1} spacing={4}>
      {!isMobile && (
        <RegistrationStepper
          activeStep={activeStep}
          formSections={formSections}
          handleAccordionChange={handleAccordionChange}
          saveForLaterButton={{
            isLoading,
            disabled: !unsavedChanges,
            onClick: onSaveLater,
          }}
        />
      )}
      {isMobile && (
        <RegistrationDrawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          activeStep={activeStep}
          formSections={formSections}
        >
          <RegistrationStepper
            activeStep={activeStep}
            formSections={formSections}
            handleAccordionChange={handleAccordionChange}
            saveForLaterButton={{
              isLoading,
              disabled: !unsavedChanges,
              onClick: onSaveLater,
            }}
          />
        </RegistrationDrawer>
      )}
      <Grid item xs={12} md={9}>
        {formKeys.map((section, i) => {
          return (
            <Accordion
              expanded={activeStep === i}
              key={section}
              sx={{
                width: '100%',
                padding: '1rem',
                borderRadius: '1rem',
                transition: activeStep === i ? '0.5s all ease' : 'none',
                opacity: activeStep === i ? '1' : '0',
                boxShadow: activeStep === i ? '0px 0px 16px 0px #ffffff80' : 'transparent',
                ...(activeStep !== i && { height: 0, paddingY: 0 }),
              }}
            >
              <AccordionDetails sx={{ px: { xs: 0, md: '1rem' } }}>
                {i === activeStep && (
                  <>
                    {section === 'AboutYou' && (
                      <AboutYou
                        user={user}
                        form={formSections[section].form}
                        onNext={(data: AboutYouZodForm) => {
                          handleNextStep(formToAppMap.AboutYou(data, application))
                        }}
                      />
                    )}
                    {section === 'Experience' && (
                      <ExperienceForm
                        form={formSections[section].form}
                        onNext={(data: ExperienceZodForm) => {
                          handleNextStep(formToAppMap.Experience(data, application))
                        }}
                      />
                    )}
                    {section === 'OpenEndedResponses' && (
                      <OpenEndedResponsesForm
                        form={formSections[section].form}
                        onNext={(data: OpenEndedResponsesZodForm) => {
                          handleNextStep(formToAppMap.OpenEndedResponses(data, application))
                        }}
                      />
                    )}
                    {section === 'DeerHacks' && (
                      <DeerhacksForm
                        form={formSections[section].form}
                        onNext={(data: DeerhacksZodForm) => {
                          handleNextStep(formToAppMap.DeerHacks(data, application))
                        }}
                      />
                    )}
                    {section === 'Review' && (
                      <FormReview
                        user={user}
                        application={application}
                        onSubmit={() => setOpenConfirmation(true)}
                      />
                    )}
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Grid>
      <Suspense>
        <Modal
          open={openConfirmation}
          loading={isLoading}
          setOpen={setOpenConfirmation}
          onSubmit={() => onSubmit({ req: { is_draft: false, application } })}
          title="Submit Application"
          content={
            <Typography>
              You will not be able to re-submit your application. Likewise, you will be unable to
              change your name and email after registering. Are you sure you want to proceed?
            </Typography>
          }
        />
      </Suspense>
    </Grid>
  )
}

const RegistrationLoader = () => {
  const { toggles } = useFeatureToggle()
  const { user, loading, authenticated } = useAuth()

  const allowedStatuses = ['registering', 'applied', 'selected', 'accepted', 'attended', 'rejected']

  const enabled =
    authenticated &&
    user?.status &&
    allowedStatuses.includes(user.status) &&
    (toggles.signupHacker || user.status !== 'registering' || toggles.bypassPage)

  const {
    data: applicationData,
    isLoading: applicationLoading,
    isError: applicationError,
  } = useApplicationGet({ enabled })

  const {
    data: resumeData,
    isLoading: resumeLoading,
    isError: resumeError,
  } = useResumeGet({ enabled: enabled && !!applicationData })

  if (!toggles.dashboard && !toggles.bypassPage) return <Error418Page />
  if (!loading && !authenticated) return <Error401Page />

  if (user?.status && !allowedStatuses.includes(user.status)) {
    return (
      <FullPageLoader
        show
        pulse={false}
        text="User unauthorized to register."
        buttonText="Go Back"
        buttonLink="/dashboard"
      />
    )
  }

  if (
    !toggles.signupHacker &&
    user?.status &&
    user.status === 'registering' &&
    !toggles.bypassPage
  ) {
    return (
      <FullPageLoader
        show
        pulse={false}
        text="Registration is unavailable at this time."
        buttonText="Go Back"
        buttonLink="/dashboard"
      />
    )
  }

  if (applicationError || resumeError) return <Error500Page />

  return (
    <>
      <Head>
        <title>Registration | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user || applicationLoading || resumeLoading ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container
            sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <BackButton navbar text="Dashboard" href="/dashboard" />
            <Typography
              variant="h1"
              display="flex"
              alignItems="center"
              textAlign="left"
              gap="0.5rem"
            >
              My Application
            </Typography>
            {user.status === 'registering' ? (
              <Registration
                user={user}
                savedApplication={{
                  ...applicationData.application,
                  resume_file_name: '',
                  resume_link: '',
                  resume_update_count: 0,
                  ...(resumeData && { ...resumeData }),
                }}
              />
            ) : (
              <FormReview
                user={user}
                application={{
                  ...applicationData.application,
                  resume_file_name: '',
                  resume_link: '',
                  resume_update_count: 0,
                  ...(resumeData && { ...resumeData }),
                }}
              />
            )}
          </Container>
        </Fade>
      )}
    </>
  )
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

export default RegistrationLoader

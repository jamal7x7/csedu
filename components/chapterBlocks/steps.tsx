'use client'
import { Button } from '@/components/ui/button'
import { Stepper, StepperConfig, StepperItem } from '@/components/ui/stepper'
import { useStepper } from '@/components/ui/use-stepper'
import { CheckCircle2, XCircle } from 'lucide-react'
const steps = [
  { label: 'Step 1 ' },
  { label: 'Step 2' },
  { label: 'Step 3' },
] satisfies StepperConfig[]

export default function StepperClickableSteps() {
  const {
    nextStep,
    prevStep,
    setStep,
    resetSteps,
    activeStep,
    isDisabledStep,
    isLastStep,
    isOptionalStep,
  } = useStepper({
    initialStep: 0,
    steps,
  })

  return (
    <div className='flex w-full flex-col gap-4'>
      <Stepper
        orientation='vertical'
        onClickStep={(step) => setStep(step)}
        activeStep={activeStep}
        // successIcon={<CheckCircle2 />}
        errorIcon={<XCircle />}
        variant='secondary'
      >
        {steps.map((step, index) => (
          <StepperItem index={index} key={index} {...step}>
            <div className='h-40 w-full rounded-lg bg-muted/50 dark:bg-muted/20 p-4 text-slate-900 dark:text-muted-foreground '>
              <p>Step {index + 1} content</p>
            </div>
          </StepperItem>
        ))}
      </Stepper>
      {/* <div className='flex items-center justify-end gap-2'>
        {activeStep === steps.length ? (
          <>
            <h2>All steps completed!</h2>
            <Button onClick={resetSteps}>Reset</Button>
          </>
        ) : (
          <>
            <Button disabled={isDisabledStep} onClick={prevStep}>
              Prev
            </Button>
            <Button onClick={nextStep}>
              {isLastStep ? 'Finish' : isOptionalStep ? 'Skip' : 'Next'}
            </Button>
          </>
        )}
      </div> */}
    </div>
  )
}

import { ReactElement, useState } from 'react'

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCrrentStepIndex] = useState(0)

  function next() {
    setCrrentStepIndex((i) => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }
  function back() {
    setCrrentStepIndex((i) => {
      if (i <= 0) return i
      return i - 1
    })
  }
  function goTo(index: number) {
    setCrrentStepIndex(index)
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    next,
    back,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  }
}

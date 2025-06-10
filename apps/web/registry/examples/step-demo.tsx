import Link from "next/link"
import { Step, StepItem } from "@/registry/ui/step"

export default function StepDemo() {
  return (
    <Step>
      <StepItem title="Step one">
        Make sure you have Node.js installed on your machine.{" "}
        <Link href={"https://nodejs.org"} className="!underline">
          You can download it from here
        </Link>
        .
      </StepItem>
      <StepItem title="Step two">
        After cloning the repository, navigate to the project directory and
        install the necessary dependencies:
      </StepItem>
      <StepItem title="step three">Start the development server:</StepItem>
    </Step>
  )
}
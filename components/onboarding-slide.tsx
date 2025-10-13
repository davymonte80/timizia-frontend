import Image from 'next/image';
import { Button } from '@/components/ui/button';

type SlideProps = {
  imageSrc: string;
  title: string;
  description: string;
  isLast?: boolean;
  onSignUp?: () => void;
  onLogin?: () => void;
};

export function OnboardingSlide({ imageSrc, title, description, isLast, onSignUp, onLogin }: SlideProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <Image src={imageSrc} alt={title} width={300} height={200} className="mb-8" />
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <p className="mt-4 text-neutral">{description}</p>
      {isLast && (
        <div className="mt-8 space-y-4 w-full max-w-xs">
          <Button className="w-full bg-primary" onClick={onSignUp}>Sign up</Button>
          <Button variant="link" onClick={onLogin}>Have an account? Login</Button>
        </div>
      )}
    </div>
  );
}
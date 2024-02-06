'use client';

import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Spinner,
} from '@nextui-org/react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <Card className="max-w-full w-[340px] h-[420px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="Kitman Clean Logo"
          height={60}
          radius="sm"
          src="./kitman-clean-logo.jpg"
          width={60}
        />
        <div className="flex flex-col">
          <p className="text-md font-semibold">Kitman Clean</p>
          <p className="text-small text-default-500">@kitman.clean</p>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden">
        <h1 className="text-center text-2xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-center mb-5">Sign in below to access dashboard</p>
        <form
          className="flex flex-col flex-1 justify-between"
          action={dispatch}
        >
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              label="Username"
              name="username"
              variant="bordered"
              size="sm"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              variant="bordered"
              size="sm"
            />
            {errorMessage && (
              <div className="p-2 bg-red-400 rounded-lg border border-red-200 text-white transition-all duration-200">
                <span className="mr-2">&#9888;</span> {errorMessage}
              </div>
            )}
          </div>
          <div>
            <LoginButton />
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth color="success" size="md" aria-disabled={pending} type='submit'>
      <span className="font-semibold text-white">Login</span>
    </Button>
  );
}

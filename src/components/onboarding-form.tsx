import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { updateProfile } from '@/services/profile.service';
import { useAuth } from '@/context/auth-provider';

const formSchema = z.object({
  business_name: z.string().min(2),
  business_type: z.string().min(2),
  phone_number: z.string().min(8),
});

export default function OnboardingForm({
  onNext,
  className,
  ...props
}: React.ComponentProps<'form'> & {
  onNext: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: '',
      business_type: '',
      phone_number: '',
    },
  });
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { data, error } = await updateProfile(values, user?.id!);
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      throw new Error(error.message);
    }

    setIsLoading(false);
    onNext();

    return data;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('flex flex-col gap-6 w-full md:w-6/12', className)}
        {...props}
      >
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="business_name"
            render={({ field }) => (
              <FormItem className="grid gap-3 w-full">
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="business_type"
            render={({ field }) => (
              <FormItem className="grid gap-3  w-full">
                <FormLabel>Business Type</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border w-full">
                    <SelectItem value="software_engineer">
                      Software Engineer / Software Developer
                    </SelectItem>
                    <SelectItem value="fashion_designer">
                      Fashion Designer
                    </SelectItem>
                    <SelectItem value="coach">Coach</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="grid gap-3 w-full">
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="e.g +1-234-456-890"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4">
            <Button variant={'outline'} className="flex-1" type="button">
              Skip
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className="flex-1 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin" />} Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

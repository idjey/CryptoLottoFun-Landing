"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function SignupForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with:", data);
    toast({
      title: "Thank you for signing up!",
      description: `We'll notify ${data.email} when we launch.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex w-full items-start space-x-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input 
                        placeholder="Enter your email for launch updates" 
                        {...field}
                        className="h-12 text-base border-primary/20 focus:border-primary focus:ring-primary/50 bg-background/50 backdrop-blur-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
                type="submit" 
                className="h-12 text-lg font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity duration-300"
                disabled={form.formState.isSubmitting}
            >
                Notify Me
            </Button>
        </div>
      </form>
    </Form>
  );
}

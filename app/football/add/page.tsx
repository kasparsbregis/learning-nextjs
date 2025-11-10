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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.string().min(1, {
    message: "Age is required.",
  }),
  team: z.string().min(2, {
    message: "Team must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  isActive: z.boolean(),
});

const AddFootballPlayer = () => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      team: "",
      position: "",
      isActive: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          age: parseInt(values.age),
          team: values.team.split(",").map((t) => t.trim()), // Convert to array
          position: values.position,
          isActive: values.isActive,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Player added:", data);
        form.reset(); // Reset form after successful submission
        router.push("/football"); // Redirect to players list
      } else {
        console.error("Failed to add player");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <section className="flex flex-col items-center h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold">Add A Player</h1>
      <div className="mt-10 w-full max-w-md border border-[var(--background-light)] p-4 rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player Age</FormLabel>
                  <FormControl>
                    <Input placeholder="Age" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team (comma-separated for multiple)</FormLabel>
                  <FormControl>
                    <Input placeholder="Team 1, Team 2..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is player Active?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "active")
                      }
                      value={field.value ? "active" : "inactive"}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="active" id="r1" />
                        <Label
                          htmlFor="r1"
                          className="text-green-600 dark:text-green-400 hover:cursor-pointer"
                        >
                          Active
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="inactive" id="r2" />
                        <Label
                          htmlFor="r2"
                          className="text-red-600 dark:text-red-500 hover:cursor-pointer"
                        >
                          Inactive
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="hover:cursor-pointer w-full" type="submit">
              + Add A Player
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default AddFootballPlayer;

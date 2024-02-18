"use client";

import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useOptimistic,
} from "react";

import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { editSwitch } from "@/app/utils/adminEditSwitchAtom";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Input } from "@/components/ui/input";

import AddChapterButton from "@/components/addChapterButton";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formBlockSchema, TformBlockSchema } from "@/lib/types";

import {
  addBlockAction,
  addTitleAction,
  addTitleAction2,
} from "@/actions/actions";
import { addBlockActionNew } from "@/actions/blockActions";
import { Skeleton } from "./ui/skeleton";
import { H1, H3 } from "./Typography/Typography";
import ChapterLink from "./ChapterLink";

const AddBlockForm = ({
  thisChapter,
  chapterId,
}: {
  thisChapter: any;
  chapterId: string;
}) => {
  // const addTitleActionWithLevelId = addTitleAction.bind(null, chapterId)
  const addBlockActionWithChapterId = addBlockActionNew.bind(null, thisChapter);

  const [showAddTitle, setShowAddTitle] = useState(false);
  const [editOnOff] = useAtom(editSwitch);

  const [zodErrors, setZodErrors] = useState({});

  const form = useForm<TformBlockSchema>({
    resolver: zodResolver(formBlockSchema),
    defaultValues: {
      content: "",
      type: "P",
    },
  });
  // console.log(JSON.stringify(form.control._formValues, null, 2))

  const blockTypes = [
    // 'CHAPTER_TITLE',
    "INTRO",
    "P",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "DEF",
    "EXEMPLE",
    "LIST",
    "FIGURE",
    // 'Blockquote',
    // 'InlineCode',
    // 'Lead',
    // 'Large',
    // 'Small',
    // 'Muted',
  ];

  const onSubmit = async (formData: TformBlockSchema) => {
    form.reset();
    console.log("hello!", JSON.stringify(formData, null, 2));

    const errorResponse = await addBlockActionWithChapterId(formData);
    // console.log(errorResponse)
    const result = formBlockSchema.safeParse(errorResponse);

    console.log(JSON.stringify(result, null, 2));
    if (!result.success) {
      //output error message
      // console.log(result.error.issues)

      result.error.issues.forEach((issue) => {
        setZodErrors({ [issue.path[0]]: issue.message });
        // console.log(JSON.stringify(zodErrors, null, 2))
      });
    }
  };

  const clientAddBlockAction: () => void = form.handleSubmit(async (data) => {
    console.log("hello!", JSON.stringify(data, null, 2));
    form.reset();

    const errorResponse = await addBlockActionWithChapterId(data);
    // console.log(errorResponse)
    const result = formBlockSchema.safeParse(errorResponse);

    console.log(JSON.stringify(result, null, 2));
    if (!result.success) {
      //output error message
      // console.log(result.error.issues)

      result.error.issues.forEach((issue) => {
        setZodErrors({ [issue.path[0]]: issue.message });
        // console.log(JSON.stringify(zodErrors, null, 2))
      });
    }
  });

  const showAddHideForm = editOnOff && showAddTitle;

  return (
    <>
      {/* {allBlocks?.map((content: any) => (
        <Block content={content} chapterId={chapterId} />
      ))} */}
      {editOnOff && (
        <Form {...form}>
          <form
            action={clientAddBlockAction}
            // onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input autoFocus placeholder="Contenue" {...field} />
                  </FormControl>

                  <FormDescription></FormDescription>
                  <FormMessage />
                  {/* <FormMessage>
                    {Object.keys(zodErrors).length !== 0 && zodErrors?.content}
                    {JSON.stringify(form.formState.errors.content, null, 2)}
                  </FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleGroup
                      onValueChange={field.onChange}
                      // onClick={() => field.value}
                      value={field.value}
                      // onValueChange={(value) => {
                      //   if (value) setValue(value)
                      // }}
                      // defaultValue='DEF'
                      type="single"
                      className="border-muted bg-card/90   relative mt-4   flex w-full flex-wrap rounded-xl border-[1px] p-2 shadow-xl   after:opacity-60 dark:after:opacity-100 "
                    >
                      {blockTypes.map((b, i) => (
                        <FormItem className="z-[2]" key={i}>
                          <FormControl>
                            <ToggleGroupItem
                              variant={"default"}
                              className=" data-[state=on]:bg-accent/50 border-accent-foreground/20 dark:border-accent-foreground/10 relative data-[state=on]:border-[1px]"
                              value={b}
                            >
                              {b}
                            </ToggleGroupItem>
                          </FormControl>
                        </FormItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <AddChapterButton /> */}
          </form>
        </Form>
      )}

      {/* {editOnOff && (
        <Button
          onClick={() => setShowAddTitle(!showAddTitle)}
          size={'lg'}
          variant='outline'
        >
          {!showAddTitle && <PlusCircle className='mr-2 h-4 w-4' />}
          {!showAddTitle ? 'Ajouter un block' : 'Cancel'}
        </Button>
      )} */}
    </>
  );
};

export default AddBlockForm;

const Block = ({ content, chapterId }: { content: any; chapterId: any }) => {
  return <div>{content.content}</div>;
};

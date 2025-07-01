"use client"

import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/ui/button";
import RichTextEditor from "./RichTextEditor";

type FormValues = {
    content: string;
};

export default function RichTextEditorForm() {
    const { 
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting, isDirty } 
    } = useForm<FormValues>({
        defaultValues: {
            content: ""
        }
    });

    const onSubmit = (data: FormValues) => {
        toast.success(
            <pre className="text-left whitespace-pre-wrap break-words">
                {JSON.stringify({ content: data.content }, null, 2)}
            </pre>
        );
    };

    const handleReset = () => {
        reset();
        toast.info("Editor reiniciado");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                            rows={14}
                            maxRows={20}
                            prompt="Describe el contenido que deseas generar"
                        />
                    )}
                />
            </div>

            <div className="flex gap-4 justify-end">
                <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={handleReset}
                    disabled={!isDirty}
                >
                    Reiniciar
                </Button>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
            </div>
        </form>
    );
}
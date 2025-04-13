
import Container from "@/components/Container";
import { Badge } from "@/components/library/badge";
import { Button } from "@/components/library/button";
import Link from "next/link";

const ViewPage = () => {
    return (
        <div className="min-h-[86.5vh] py-8">
            <Container>
                <section className="my-14 md:my-16 space-y-3">
                    <div className="space-y-6 flex items-center justify-center flex-col">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            Libraries blocks of alphabyte-labs
                        </h1>
                        <p className="text-lg md:text-xl text-foreground max-w-4xl ">
                            Browse the categories in the navbar our visit
                            <Badge
                                className="mx-1.5 text-base rounded-xl"
                                variant={"outline"}
                            >
                                /block/:id
                            </Badge>
                            for individual blocks. For example try
                            <Button variant={"link"} asChild>
                                <Link href={"blocks/hero1"}>Hero1</Link>
                            </Button>
                        </p>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default ViewPage;

import Container from "@/components/Container";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Container>
            <div>{children}</div>
        </Container>
    );
};

export default MainLayout;

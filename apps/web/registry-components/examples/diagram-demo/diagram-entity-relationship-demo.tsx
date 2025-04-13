import Mermaid from "@/components/library/mermaid"

const DiagramsEntityRelationShipDemo = () => {
  return (
    <Mermaid
      chart={`erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    PRODUCT ||--o{ LINE-ITEM : "included in"
    CUSTOMER {
        string name
        string email
    }
    ORDER {
        int orderNumber
        date orderDate
    }
    LINE-ITEM {
        int quantity
        float price
    }
    PRODUCT {
        int productId
        string name
        float price
    }`}
    />
  )
}

export default DiagramsEntityRelationShipDemo

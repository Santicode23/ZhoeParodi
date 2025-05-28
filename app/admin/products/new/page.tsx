import AddProductForm from "@/components/productos/AddProductForm";
import ProductForm from "@/components/productos/ProductForm";
import Heading from "@/components/ui/Heading";

export default function CreateProductPage() {
  return (
        <>
          <Heading>Nuevo Producto</Heading>

          <AddProductForm>
            <ProductForm />
          </AddProductForm>
        </>
    )
}
  

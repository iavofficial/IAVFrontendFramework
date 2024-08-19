import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export const ExampleComponent4 = () => {

    return (
        <div style={{
            display: "flex", gap: "40px", flexDirection: "column", maxHeight: "90vh", overflow: "auto",
            paddingRight: "10px", paddingLeft: "10px"
        }}>
            <div>
                <DataTable value={[]}>
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>
            </div>
            <div>
                <DataTable value={[]}>
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>
            </div>
        </div>
    );
};

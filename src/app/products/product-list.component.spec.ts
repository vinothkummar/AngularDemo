import { ProductListComponent } from "./product-list.component";
import { of } from "rxjs";


describe(`Product List Component`, () => {
    let component: ProductListComponent;
    const fakeProducts = {id: 1, productName: 'Galaxy s7', modelCode: 'SM-S8ABCD13', serialNumber: 'SN00000001', price: 350.75, starRating: 3.6} as any;
    const fakeProductService = {        
        getProducts: () => of([fakeProducts]),
        httpClient: {}
    } as any;

    beforeEach(() => {        
        component = new ProductListComponent(fakeProductService);
    });

    it(`should have a component`, () => {
        expect(component).toBeTruthy();        
    });

    it(`should have a list of Products`, () =>{
        component.ngOnInit();
        
        fakeProductService.getProducts().subscribe(product => {
            expect(component.products).toEqual(product)            
            })           
    });

    it(`should return all the Products when there is no filter`, () =>{
        component.ngOnInit();        
        
        fakeProductService.getProducts().subscribe(product => {
            expect(component.filteredProducts).toEqual(product)            
            })           
    });
});
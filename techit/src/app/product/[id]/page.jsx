export default async function Product({params}) {
    console.log(params.id)
    const res = await fetch(
        `http://43.205.138.125:8080/products/${params.id}`,
        { cache: "no-store" }
      );
      const result = await res.json();
    return (
        <main class="bg-test-color text-white">
  <div class=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 ml-11 mr-10 mb-11 mt-11">
 
 <img src={result.Image} alt="Laptop Photo" class="w-auto  h-auto rounded-lg"/>
 <div class=" min-[320px]:pl-2 min-[320px]:pr-2 min-[320px]:pt-2 lg:pl-9 lg:pt-4 pb-4 md:pt-4 md:pl-9 sm:pl-5 sm:pt-2 flex flex-col justify-between">
   <div>
     <h3 class="sm:text-xs md:text-base lg:text-xl font-semibold mb-2 lg:pr-6 md:pr-4 sm:pr-2   min-[320px]:text-sm">{result.Product_Name}</h3>
     <p class="text-white-600 lg:pl-2 lg:pr-3 md:pl-2 md:pr-3 sm:pl-1 sm:pr-2 sm:text-xs md:text-base lg:text-base  min-[320px]:text-sm">{result.Price}</p>
   </div>
   <div class="mt-2 sm:text-xs md:text-base lg:text-base  min-[320px]:text-xs">
     <ul class="list-disc lg:pl-2 lg:pr-3 md:pl-2 md:pr-3 sm:pl-1 sm:pr-2">
     <li>{result.Processor}</li>
       <li>{result.Memory}</li>
     </ul>
   </div>
   <p>{result.Details}</p>
   <button class="min-[320px]:text-xs sm:text-xs md:text-base lg:text-base min-[320px]:mt-2 min-[320px]:mr-2 lg:mt-4 lg:mr-3 md:mt-4 md:mr-3 sm:mt-2 sm:mr-1  bg-black text-white rounded-md min-[320px]:px-2 min-[320px]:py-1 lg:px-4 lg:py-2 md:px-4 md:py-2 sm:px-2 sm:py-2 hover:bg-blue-600 transition duration-300">Add to cart</button>
 </div>
</div>
        </main>
      
  
    );
}
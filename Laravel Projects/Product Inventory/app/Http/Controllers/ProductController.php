<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('index');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'priceFrom' => 'nullable|numeric',
            'priceTo' => 'nullable|numeric',
            'quantityFrom'=> 'nullable|numeric',
            'quantityTo'=> 'nullable|numeric',
            'category_id'=> 'nullable|numeric|exists:categories,id',
        ]);    
        $categories=Category::all();
        $products=Product::select('*');
        if (!empty($validated['name'])) {
            $products=$products->where('name','like','%'.$validated['name'].'%');
        }
        if (!empty($validated['category_id'])) {
            $products=$products->where('category_id','=',$validated['category_id']);
        }
        if (!empty($validated['priceFrom'])) {
            $products=$products->where('price','>=',$validated['priceFrom']);
        }
        if (!empty($validated['priceTo'])) {
            $products=$products->where('price','<=',$validated['priceTo']);
        }
        if (!empty($validated['quantityFrom'])) {
            $products=$products->where('quantity','>=',$validated['quantityFrom']);
        }
        if (!empty($validated['quantityTo'])) {
            $products=$products->where('quantity','<=',$validated['quantityTo']);
        }
        $products=count($products->get())==0 ? null:$products->get(); 
        return view('home', ['products' => $products,'categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories=Category::all();
        return view('product.create', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();
        $product = Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'quantity'=> $validated['quantity'],
            'slug'=>Str::slug($validated['name'], '-'),
            'category_id'=> $validated['category_id'],
        ]);
        $product->slug=$product->slug.''.$product->id.'-'.rand();
        if (isset($validated['description'])){
            $product->description=$validated['description'];
        }
        if (isset($validated['image_path'])){
            $product->image_path = $validated['image_path']->store('product-images/uploads','public');
        }
        $product->save();
        return redirect('/')->with('success', 'Your product has been added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
    */
    public function show($slug)
    {
        $product=Product::where('slug', '=', $slug)->firstOrFail();
        return view('product.detail',['product'=>$product]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit($slug)
    {
        $product=Product::where('slug', $slug)->firstOrFail();
        $categories=Category::all();
        return view('product.edit',['product'=>$product,'categories' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, $product)
    {
        $validated = $request->validated();
        $product = Product::findOrFail($product);
        $product->price = $validated['price'];
        $product->quantity= $validated['quantity'];
        $product->category_id= $validated['category_id'];
        if ($validated['name']!=$product->name) {
            $product->name = $validated['name'];
            $product->slug=$product->slug.''.$product->id.'-'.rand();
        }
        if (isset($validated['description'])){
            $product->description=$validated['description'];
        }
        if (isset($validated['image_path'])){
            $product->image_path = $validated['image_path']->store('product-images/uploads','public');
        }
        elseif (isset($validated['photo-clear'])) {
            $product->image_path = 'product-images/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg';
        }
        $product->save();
        return redirect('/')->with('success', 'Your product has been updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($product)
    {
        $product = Product::findOrFail($product);
        $product->delete();
        return redirect('/')->with('success', 'Your product has been deleted!');
    }
}

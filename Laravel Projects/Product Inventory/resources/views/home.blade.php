@extends('layouts.app')
@section('title')   Home    @endsection
@section('content')
<div class="p-4 text-center">
<img src="https://inventrik.com/wp-content/uploads/2017/09/imssq-newwhite.jpg" alt="Home image" 
class="mx-auto d-block rounded-circle" width="20%" height="155em">
    
</div>
<div class="card bg-light text-black">
    <div class="card-body">
    <h6 class="card-title text-center display-6">Search Your Products</h6>
    <form class="card-text text-center row justify-content-around">
      <div class='col-md-2'>
        <label for="title">Name</label><br>
        <input type="text" id="title" name="name">
      </div>
      <div class='col-md-3'>
        <label for="price">Price</label><br>
        <input type="text" id="price" name="priceFrom" placeholder="From">
        <input type="text" id="price" name="priceTo" placeholder="To">
      </div>
      <div class='col-md-3'>
        <label for="quantity">Quantity</label><br>
        <input type="number" id="quantity" name="quantityFrom" placeholder="From">
        <input type="text" id="price" name="quantityTo" placeholder="To">
      </div>
      <div class='col-md-2'>
      <label for="category">Category</label><br>
          <select id="category" name="category_id">
          <option disabled selected>Select Category</option>
           @forelse ($categories as $category)
           <option value="{{ $category->id }}">{{ $category->name }}</option>
           @empty
           <p>No categories available</p>
            @endforelse
            </select>
      </div>
      <div class='col-md-1'>
        <button type="submit" class="btn btn-dark"><i class="fa fa-search"></i></button>
      </div>
    </form>
    </div>
</div>

@if (session('success'))
  <h4 class="text-center mt-2">
    <span class="badge bg-success">{{ session('success') }}</span>
  </h4>
@endif

@if (isset($products) )
<table class="table table-bordered table-light mt-3">
<thead class="table-info">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name 
        @auth 
        (Click for further details) 
        @endauth 
      </th>
      <th scope="col">Category</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      @auth
      <th scope="col">Actions</th>
      @endauth
    </tr>
  </thead>
  <tbody>
  @foreach ($products as $product)
  <tr>
      <th scope="row">{{ $product->id }}</th>
      <td> @auth <a href="{{ route('product.detail',['product' => $product->slug]) }}" class="text-decoration-none">
      @endauth  
      {{ $product->name }} @auth </a>  @endauth </td>
      <td>{{ $product->category->name }}</td>
      <td>{{ $product->price }}</td>
      <td>{{ $product->quantity }}</td>
      @auth
      <td>
          <a class="btn btn-dark" href="{{ route('product.edit',['product' => $product->slug]) }}" role="button">Edit</a>
          <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button> 
        <!-- Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Confirm Product Deletion</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form method="POST" action="{{ route('product.delete',['product' => $product->id]) }}" class="modal-body">
        @csrf
        @method('DELETE')
        <p>Are you sure you want to delete this product?</p> 
        
        <div class="float-end">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <input type="submit" value="Confirm" class="btn btn-danger">
        </div>
      </form>
    </div>
  </div>
</div>
        </td>
        @endauth
    </tr>
  @endforeach
    </tbody>
</table>
@else
<p class="text-center text-white display-6 mt-3">No products found</p>
@endif
@endsection

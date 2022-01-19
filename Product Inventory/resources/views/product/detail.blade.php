@extends('..layouts.app')
@section('title')   Product Details   @endsection
@section('content')
<div class="card w-75 mx-auto border border-secondary shadow-sm" style="border:none;">
<h3 class="card-header bg-warning text-white text-center fw-bold">{{ $product->name }}</h3>
    <ul class="list-group list-group-flush">
        <li class="list-group-item card-subtitle text-muted">Category: {{ $product->category->name }}</li>
        <li class="list-group-item card-subtitle text-muted">Price: {{ $product->price }}</li>
        <li class="list-group-item card-subtitle text-muted">Quantity: {{ $product->quantity }}</li>
        <li class="list-group-item card-subtitle text-muted">Created: {{ $product->created_at }}</li>
    </ul>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end position-absolute end-0" style="top:0.5%;">
        <a href="{{ route('product.edit',['product' => $product->slug]) }}" class="btn btn-dark rounded-circle me-md-1"><i class="fs-5 fa fa-pencil"></i></a>    
        <button class="btn btn-danger rounded-circle me-md-2" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fs-5 fa fa-trash"></i></button> 
    </div>
        <p class="card-body card-text fs-5">
        <img src="{{ asset('storage/'.$product->image_path) }}" alt="Product image" class="d-block mx-auto" width="60%" height="400em">

        {{ $product->description }}
        </p>
</div>
<!-- Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Confirm Product Deletion</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form method='POST' class="modal-body" action="{{ route('product.delete',['product' => $product->id]) }}">
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
@endsection
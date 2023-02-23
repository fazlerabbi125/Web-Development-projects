@extends('..layouts.app')
@section('title')   Add product    @endsection
@section('content')
<div class="card mx-auto shadow-sm w-50">
  <h4 class="card-header text-center">
    Add Your Product
  </h4>
  <div class="card-body">
    <p class="card-text">
        <form method="POST" action="{{ route('product.store') }}" enctype="multipart/form-data">
            @csrf
            <div class="row mb-3">
                <label for="name" class="col-md-3 col-form-label text-md-end">Name</label>
                <div class="col-md-6">
                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" required>        
                </div>
            </div>
            @error('name')
                <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="price" class="col-md-3 col-form-label text-md-end">Price</label>
                <div class="col-md-6">
                <input type="text" class="form-control @error('price') is-invalid @enderror" id="price" name="price" required>
                </div>
            </div>
            @error('price')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="quantity" class="col-md-3 col-form-label text-md-end">Quantity</label>
                <div class="col-md-6">
                <input type="number" class="form-control @error('quantity') is-invalid @enderror" id="quantity" name="quantity" required>
                </div>
            </div>
            @error('quantity')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="image_path" class="col-md-3 col-form-label text-md-end">Photo</label>
                <div class="col-md-6">
                <input type="file" class="form-control @error('image_path') is-invalid @enderror" id="image_path" name="image_path">
                </div>
            </div>
            @error('image_path')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="category" class="col-md-3 col-form-label text-md-end">Category</label>
                <div class="col-md-6">
                    <select id="category" name="category_id" class="form-select" required>
                        <option disabled selected>Select Category</option>
                        @forelse ($categories as $category)
                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                        @empty
                            <p>No categories available</p>
                        @endforelse
                    </select>
                </div>
            </div>
            @error('category_id')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="description" class="col-md-3 col-form-label text-md-end">Description</label>
                <div class="col-md-6">
                <textarea name="description" class="form-control @error('description') is-invalid @enderror" id="description" cols="50" rows="10"></textarea>
                </div>
            </div>
            @error('description')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
  </div>
</div>
@endsection
@extends('layouts.app')
@section('title')   Category   @endsection

@section('content')
<button class="btn btn-info btn-lg d-block mx-auto mb-3" data-bs-toggle="modal" data-bs-target="#addcategorymodal"><span></span><i class="fa fa-plus"></i> <span>Add Category</span></button>
<!-- Modal -->
<div class="modal fade" id="addcategorymodal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add New Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <form action="{{ route('category.store') }}" method="post">
            @csrf
            <div class="row justify-content-center">
                <div class="col-auto">
                    <label class="col-form-label" for="name">Category Name:</label>
                </div>
                <div class="col-auto">
                    <input type="text" name="name" id="name" class="form-control">
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success">Add</button>
        </form>
      </div>
    </div>
  </div>
</div>
@error('name')
<h4><span class="badge bg-danger">{{ $message }}</span></h4>
@enderror
@if (session('success'))
<h4><span class="badge bg-success">{{ session('success') }}</span></h4>
@endif
<div class="accordion row justify-content-center" id="accordionPanelsStayOpenExample">
  @forelse ($categories as $category)
      <div class="accordion-item col-md-3 mx-1 mb-2">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse{{ $category->id }}" aria-expanded="false" aria-controls="panelsStayOpen-collapse{{ $category->id }}">
          {{ $category->name }}
          </button>
        </h2>
        <div id="panelsStayOpen-collapse{{ $category->id }}" class="accordion-collapse collapse">
          <div class="accordion-body">
            <ul>
            @forelse ($category->products as $product)
                <li class="ms-1"><a href="{{ route('product.detail',$product->slug) }}" class="text-decoration-none">{{ $product->name }}</a></li>
                @empty
                <div>No products in this category</div>
            @endforelse
            </ul>  
            <div class="mx-auto">
              <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editcategorymodal{{ $category->id }}">Edit category</button>
<div class="modal fade" id="editcategorymodal{{ $category->id }}" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Selected Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <form action="{{ route('category.update',$category) }}" method="post">
            @csrf
            @method('PUT')
            <div class="row justify-content-center">
                <div class="col-auto">
                    <label class="col-form-label" for="name">New Category Name:</label>
                </div>
                <div class="col-auto">
                    <input type="text" name="name" id="name" class="form-control" value="{{ $category->name }}">
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-warning">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</div>
              <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletecategorymodal{{ $category->id }}">Delete category</button>
<div class="modal fade" id="deletecategorymodal{{ $category->id }}" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete Selected Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <form action="{{ route('category.delete',$category) }}" method="post">
            @csrf
            @method('DELETE')
            <p>Are you sure you want to delete this category?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-danger">Delete</button>
        </form>
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
@empty
    <p class="h3 text-white">No categories created</p>
@endforelse
</div>

@endsection
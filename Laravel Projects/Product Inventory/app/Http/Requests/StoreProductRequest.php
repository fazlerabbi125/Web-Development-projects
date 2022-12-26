<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity'=> 'required|numeric',
            'image_path' => 'nullable|mimes:jpg,jpeg,png',
            'category_id'=> 'required|numeric|exists:categories,id',
            'description' => 'nullable|string',
        ];
    }
}

Rails.application.routes.draw do
  devise_for :users
  root 'weathers#index'
  resources :weathers
  resources :shares
  resources :users, only: [:edit, :update]
end

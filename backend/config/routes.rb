Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  resources :horses, only: [:index]
  resources :races, only: [:index, :create, :show]
  resources :entries
  put :entries, to: 'entries#bulk_update'
end

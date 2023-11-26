class HorsesController < ApplicationController
  before_action :set_horse, only: [:show, :update, :destroy]

  # GET /horses
  def index
    @horses = Horse.all
    render json: @horses
  end

  # GET /horses/:id
  def show
    render json: @horse
  end

  # POST /horses
  def create
    @horse = Horse.new(horse_params)
    if @horse.save
      render json: @horse, status: :created
    else
      render json: @horse.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /horses/:id
  def update
    if @horse.update(horse_params)
      render json: @horse
    else
      render json: @horse.errors, status: :unprocessable_entity
    end
  end

  # DELETE /horses/:id
  def destroy
    @horse.destroy
    head :no_content
  end

  private

  def set_horse
    @horse = Horse.find(params[:id])
  end

  def horse_params
    params.require(:horse).permit(:name, :age, :breed)
  end
end

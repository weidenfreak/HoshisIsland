class StickiesController < ApplicationController
  respond_to :html, :json
  
  def index
  	respond_with Sticky.all
  end
  def create
  	respond_with Sticky.create(sticky_params)
  end

  def sticky_params
  	params.require(:sticky).permit(:title)
  end
end

# -*- encoding : utf-8 -*-
class StickiesController < ApplicationController
  respond_to :html, :json

  def index
    if params[:latitude] && params[:longitude]
      respond_with Sticky.near([params[:latitude], params[:longitude]], 0.002, :units => :km)
    else
      respond_with Sticky.all
    end
  end

  def create
  	respond_with Sticky.create(sticky_params)
  end

  def sticky_params
  	params.require(:sticky).permit(:title, :longitude, :latitude, :pattern, :radius, :note)
  end
end

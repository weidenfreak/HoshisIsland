# -*- encoding : utf-8 -*-
class StickiesController < ApplicationController
  respond_to :html, :json

  def index
    if params[:latitude] && params[:longitude]
      #render :text => "latitude: #{params[:latitude]} and longitude: #{params[:longitude]}"
      respond_with Sticky.all
    else
      respond_with Sticky.all
    end
  end

  def create
  	respond_with Sticky.create(sticky_params)
  end

  def sticky_params
  	params.require(:sticky).permit(:title, :longitude, :latitude)
  end
end

class StickiesController < ApplicationController
  def index
  	respond_with Sticky.all
  end
end

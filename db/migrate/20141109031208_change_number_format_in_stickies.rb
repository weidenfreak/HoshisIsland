# -*- encoding : utf-8 -*-
class ChangeNumberFormatInStickies < ActiveRecord::Migration
  def change
    change_column :stickies, :longitude, :decimal
    change_column :stickies, :latitude, :decimal
  end
end

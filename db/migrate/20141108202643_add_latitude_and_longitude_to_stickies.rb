class AddLatitudeAndLongitudeToStickies < ActiveRecord::Migration
  def change
    add_column :stickies, :latitude, :float
    add_column :stickies, :longitude, :float
  end
end

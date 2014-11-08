class AddAttributesToStickies < ActiveRecord::Migration
  def change
    add_column :stickies, :pattern, :string
    add_column :stickies, :radius, :integer
    add_column :stickies, :note, :text
  end
end

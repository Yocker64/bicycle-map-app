import pandas as pd
import re

def extract_coordinates_from_url(url):
    """
    Extract latitude and longitude from Google Maps URL
    """
    # Check if url is actually a string (not NaN/float)
    if pd.isna(url) or not isinstance(url, str):
        return None, None
    
    # Pattern to match coordinates in the URL
    # Looks for patterns like !3d34.998392!4d135.731755
    pattern = r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)'
    
    match = re.search(pattern, url)
    if match:
        try:
            latitude = float(match.group(1))
            longitude = float(match.group(2))
            return latitude, longitude
        except ValueError:
            return None, None
    else:
        return None, None

def process_csv(input_file, output_file=None):
    """
    Process CSV file to extract coordinates from Google Maps URLs
    """
    # Read the CSV file
    df = pd.read_csv(input_file)
    
    # Extract coordinates from each URL in the 'link' column
    coordinates = df['link'].apply(extract_coordinates_from_url)
    
    # Split the coordinates into separate columns
    df['latitude'] = coordinates.apply(lambda x: x[0] if x and x[0] is not None else None)
    df['longitude'] = coordinates.apply(lambda x: x[1] if x and x[1] is not None else None)
    
    # Save to new file if output_file is specified
    if output_file:
        df.to_csv(output_file, index=False)
        print(f"Processed file saved as: {output_file}")
    else:
        df.to_csv(input_file, index=False)
        print(f"Original file updated: {input_file}")
    
    # Print summary
    successful_extractions = df['latitude'].notna().sum()
    total_rows = len(df)
    print(f"Successfully extracted coordinates from {successful_extractions} out of {total_rows} URLs")
    
    return df

# Process the file
input_filename = "konbinis.csv"
output_filename = "coordinateskonbinis.csv"

result_df = process_csv(input_filename, output_filename)

# Display results
print("\nFirst 10 rows with extracted coordinates:")
print(result_df[['link', 'latitude', 'longitude']].head(10))

print(f"\nSample coordinates from first 5 valid URLs:")
valid_coords = result_df[result_df['latitude'].notna()][['latitude', 'longitude']].head()
for idx, row in valid_coords.iterrows():
    print(f"Row {idx}: Lat {row['latitude']}, Lng {row['longitude']}")
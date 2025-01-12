import logging
import sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Create a stream handler to output to the terminal
stream_handler = logging.StreamHandler(sys.stdout)
stream_handler.setLevel(logging.INFO)

# Create a formatter and set it for the handler
formatter = logging.Formatter("[%(levelname)s] %(message)s")
stream_handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(stream_handler)

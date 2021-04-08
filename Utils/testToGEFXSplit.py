from course_parse import parse
from course_parse import course_obj
from Graph import Graph
import xml.etree.cElementTree as ET
from display import print_data
import search
import unittest
import re

class test_toGEFX_split(unittest.TestCase):

  def test_spit_CIS(self):
    g = parse(0)
    Graph.to_gefx(g, "CIS")
    f = open('testSize.gexf', 'r')
    for line in f:
      result = re.findall("!(CIS)*[0-9]+",line)
    f.close()
    self.assertEqual(result, [])

  def test_spit_PHYS(self):
    g = parse(0)
    Graph.to_gefx(g, "PHYS")
    f = open('testSize.gexf', 'r')
    for line in f:
      result = re.findall("!(PHYS)*[0-9]+",line)

    self.assertEqual(result, [])
    f.close()

